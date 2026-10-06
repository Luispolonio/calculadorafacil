"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Check, Copy, RotateCcw } from "lucide-react";
import type { Tool } from "@/lib/catalog";
import type { Result } from "@/lib/math-engine";
import FunctionPlot from "./function-plot";
import MathFormula, { MathText } from "./math-formula";
import ExpressionInput from "./expression-input";
export default function MathWorkspace({ tool }: { tool: Tool }) {
  const defaults = () =>
    Object.fromEntries(tool.fields.map((f) => [f.key, f.value]));
  const [values, setValues] = useState(defaults),
    [result, setResult] = useState<Result | null>(null),
    [error, setError] = useState(""),
    [busy, setBusy] = useState(false),
    [copied, setCopied] = useState(false);
  const worker = useRef<Worker | null>(null),
    timer = useRef<ReturnType<typeof setTimeout> | null>(null),
    copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(
    () => () => {
      worker.current?.terminate();
      if (timer.current) clearTimeout(timer.current);
      if (copyTimer.current) clearTimeout(copyTimer.current);
    },
    [],
  );
  function cancel() {
    worker.current?.terminate();
    if (timer.current) clearTimeout(timer.current);
    setBusy(false);
  }
  function run() {
    cancel();
    setResult(null);
    setError("");
    setCopied(false);
    setBusy(true);
    try {
      const w = new Worker(new URL("../lib/math.worker.ts", import.meta.url));
      worker.current = w;
      timer.current = setTimeout(() => {
        w.terminate();
        setBusy(false);
        setError(
          "El cálculo tardó demasiado. Simplifica la expresión o reduce el intervalo.",
        );
      }, 10000);
      w.onmessage = (
        event: MessageEvent<{ result?: Result; error?: string }>,
      ) => {
        if (timer.current) clearTimeout(timer.current);
        w.terminate();
        setBusy(false);
        if (event.data.error) setError(event.data.error);
        else if (event.data.result) setResult(event.data.result);
      };
      w.onerror = () => {
        if (timer.current) clearTimeout(timer.current);
        w.terminate();
        setBusy(false);
        setError(
          "No se pudo iniciar el motor de cálculo. Recarga la página e inténtalo de nuevo.",
        );
      };
      w.postMessage({ slug: tool.slug, values });
    } catch {
      setBusy(false);
      setError(
        "Tu navegador no pudo iniciar el motor de cálculo. Prueba con un navegador actualizado.",
      );
    }
  }
  async function copy() {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(
        [
          tool.title,
          result.answer,
          ...result.details.map((d) => `${d.label}: ${d.value}`),
          ...(result.workedSteps?.map(s => `${s.title}\n${s.explanation}${s.latex ? "\n" + s.latex : ""}`) || result.steps),
        ].join("\n"),
      );
      setCopied(true);
      if (copyTimer.current) clearTimeout(copyTimer.current);
      copyTimer.current = setTimeout(() => setCopied(false), 2500);
    } catch {
      setError(
        "No se pudo copiar automáticamente. Puedes seleccionar y copiar el resultado.",
      );
    }
  }
  return (
    <section
      className="math-workspace"
      aria-label={`Calculadora: ${tool.title}`}
    >
      <form
        className="math-input-panel"
        onSubmit={(e) => {
          e.preventDefault();
          run();
        }}
      >
        <div className="workspace-panel-heading">
          <span className="mono-eyebrow">01 / PLANTEA EL PROBLEMA</span>
          <button
            type="button"
            className="icon-button"
            title="Restaurar ejemplo"
            aria-label="Restaurar ejemplo"
            onClick={() => {
              cancel();
              setValues(defaults());
              setResult(null);
              setError("");
            }}
          >
            <RotateCcw size={17} />
          </button>
        </div>
        <div className="math-fields">
          {tool.fields
            .filter(
              (f) =>
                !(
                  tool.slug === "integrales" &&
                  values.mode !== "Definida" &&
                  ["lower", "upper"].includes(f.key)
                ) &&
                !(
                  tool.slug === "geometria" &&
                  ["Círculo", "Esfera"].includes(values.shape) &&
                  f.key === "height"
                ),
            )
            .map((field) => (
              <div className="math-field" key={field.key}>
                <label htmlFor={`field-${field.key}`}><MathText text={field.label}/></label>
                {field.options ? (
                  <select
                    id={`field-${field.key}`}
                    value={values[field.key]}
                    onChange={(e) => {
                      cancel();
                      setValues({ ...values, [field.key]: e.target.value });
                      setResult(null);
                      setError("");
                    }}
                  >
                    {field.options.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                ) : field.key === "expression" ? <ExpressionInput value={values[field.key]} helpId={field.help ? `help-${field.key}` : undefined} onChange={value=>{cancel();setValues({...values,[field.key]:value});setResult(null);setError("");}}/> : (
                  <input
                    id={`field-${field.key}`}
                    value={values[field.key]}
                    maxLength={
                      field.key === "data"
                        ? 6000
                        : field.key === "expression"
                          ? 160
                          : 2000
                    }
                    spellCheck={false}
                    autoComplete="off"
                    aria-describedby={
                      field.help ? `help-${field.key}` : undefined
                    }
                    onChange={(e) => {
                      cancel();
                      setValues({ ...values, [field.key]: e.target.value });
                      setResult(null);
                      setError("");
                    }}
                  />
                )}
                {field.help && (
                  <small id={`help-${field.key}`}><MathText text={field.help}/></small>
                )}
              </div>
            ))}
        </div>
        <button
          type="submit"
          className="button primary solve-button"
          disabled={busy}
        >
          {busy ? "Resolviendo…" : "Resolver problema"}
          <ArrowRight size={18} />
        </button>
        <p className="local-note">
          <span className="status-dot" /> El cálculo se realiza en tu navegador.
        </p>
      </form>
      <div className="math-result-panel" aria-live="polite" aria-busy={busy}>
        <div className="workspace-panel-heading">
          <span className="mono-eyebrow">02 / ENCUENTRA EL SENTIDO</span>
          {result && (
            <button
              className="icon-button"
              aria-label={copied ? "Resultado copiado" : "Copiar resultado"}
              onClick={copy}
            >
              {copied ? <Check size={17} /> : <Copy size={17} />}
            </button>
          )}
        </div>
        {error && (
          <div className="calculation-error" role="alert">
            <strong>Revisa el problema</strong>
            <p>{error}</p>
          </div>
        )}
        {busy && (
          <div className="result-placeholder">
            <span className="loading-symbol" aria-hidden="true">
              ƒ
            </span>
            <p>Estamos calculando tu resultado…</p>
          </div>
        )}
        {!result && !busy && !error && (
          <div className="result-placeholder">
            <span aria-hidden="true">{tool.symbol}</span>
            <h3>Aquí empieza a encajar.</h3>
            <p>
              Introduce tus datos o prueba el ejemplo.
              <br />
              Verás el resultado y cómo interpretarlo.
            </p>
          </div>
        )}
        {result && (
          <>
            <div className="result-answer">
              <span>RESULTADO</span>
              <output aria-label={result.answer}>{result.latex ? <MathFormula latex={result.latex} display /> : result.answer}</output>
              {copied && <small role="status">Resultado copiado</small>}
            </div>
            {result.details.length > 0 && (
              <dl className="result-details">
                {result.details.map((d, i) => (
                  <div key={i}>
                    <dt>{d.label}</dt>
                    <dd>{d.value}</dd>
                  </div>
                ))}
              </dl>
            )}
            {result.note && <p className="result-note">{result.note}</p>}
            {result.table && (
              <details className="result-table-details"><summary>Ver tabla de cálculo ({result.table.rows.length} filas)</summary><div className="table-scroll bounded-table">
                <table>
                  <thead>
                    <tr>
                      {result.table.headers.map((h) => (
                        <th key={h}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {result.table.rows.map((row, i) => (
                      <tr key={i}>
                        {row.map((cell, j) => (
                          <td key={j}>{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div></details>
            )}
          </>
        )}
      </div>
      {result?.plot && (
        <div className="workspace-graph">
          <div className="workspace-panel-heading">
            <span className="mono-eyebrow">03 / OTRA FORMA DE VERLO</span>
            <span className="field-help">Gráfica aproximada</span>
          </div>
          <FunctionPlot plot={result.plot} />
        </div>
      )}
      {result?.workedSteps && <section className="worked-solution" aria-label="Solución paso a paso"><div className="worked-solution-heading"><span className="mono-eyebrow">EL PROCESO, SIN SALTOS</span><h2>Entendamos cada paso.</h2><p>{result.workedSteps.length} pasos. Lee la explicación y sigue la operación; no necesitas memorizar el resultado.</p></div><ol>{result.workedSteps.map((step,i)=><li key={i}><span className="worked-step-index">{String(i+1).padStart(2,'0')}</span><div><h3>{step.title}</h3><p><MathText text={step.explanation}/></p>{step.latex&&<MathFormula latex={step.latex} display/>}{step.check&&<small>{step.check}</small>}</div></li>)}</ol></section>}
    </section>
  );
}
