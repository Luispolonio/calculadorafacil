"use client";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Check, RotateCcw, X, GraduationCap } from "lucide-react";
import { catalog, categories } from "@/lib/catalog";
import MathFormula, { MathText } from "./math-formula";
import { exerciseMath, notation, practiceProse } from "@/lib/math-notation";
import { celebrate } from "@/lib/celebrate";
import {
  generateExercise,
  randomTopic,
  type Exercise,
  type Difficulty,
} from "@/lib/practice";
type Attempt = { exercise: Exercise; selected: string };
export default function PracticeLab() {
  const searchParams = useSearchParams();
  const initialTool = catalog.find(
    (tool) => tool.slug === searchParams.get("tema"),
  );
  const questionHeading = useRef<HTMLHeadingElement>(null);
  const [topic, setTopic] = useState(initialTool?.slug || "mixto"),
    [category, setCategory] = useState<string>(
      initialTool?.category || "Todas",
    ),
    [difficulty, setDifficulty] = useState<Difficulty>("Inicial"),
    [exercise, setExercise] = useState<Exercise | null>(null),
    [selected, setSelected] = useState(""),
    [attempts, setAttempts] = useState<Attempt[]>([]),
    [checked, setChecked] = useState(false),
    [finished, setFinished] = useState(false);
  useEffect(() => {
    if (exercise) questionHeading.current?.focus();
  }, [exercise, finished]);
  const available = catalog.filter(
    (t) => category === "Todas" || t.category === category,
  );
  const correct = attempts.filter(
    (a) => a.selected === a.exercise.correct,
  ).length;
  function next() {
    const slug =
      topic === "mixto" ? randomTopic(available.map((t) => t.slug)) : topic;
    let candidate = generateExercise(slug, difficulty);
    for (
      let i = 0;
      i < 20 &&
      attempts.some((a) => (a.exercise.latex||a.exercise.question) === (candidate.latex||candidate.question));
      i++
    )
      candidate = generateExercise(slug, difficulty);
    setExercise(candidate);
    setSelected("");
    setChecked(false);
  }
  function start() {
    setAttempts([]);
    setFinished(false);
    next();
  }
  function check() {
    if (!selected || !exercise || checked) return;
    setAttempts([...attempts, { exercise, selected }]);
    setChecked(true);
    if (selected === exercise.correct) void celebrate();
  }
  function reset() {
    setExercise(null);
    setFinished(false);
    setAttempts([]);
    setSelected("");
    setChecked(false);
  }
  return (
    <div className="practice-layout">
      <aside className="practice-config">
        <span className="mono-eyebrow">TU SESIÓN</span>
        <h2>Elige tu reto.</h2>
        <label>
          Área
          <select
            value={category}
            disabled={!!exercise}
            onChange={(e) => {
              setCategory(e.target.value);
              setTopic("mixto");
            }}
          >
            {categories.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </label>
        <label>
          Tema
          <select
            value={topic}
            disabled={!!exercise}
            onChange={(e) => setTopic(e.target.value)}
          >
            <option value="mixto">Mezcla de temas</option>
            {available.map((t) => (
              <option key={t.slug} value={t.slug}>
                {t.title}
              </option>
            ))}
          </select>
        </label>
        <label>
          Dificultad
          <select
            value={difficulty}
            disabled={!!exercise}
            onChange={(e) => setDifficulty(e.target.value as Difficulty)}
          >
            {["Inicial", "Intermedio", "Avanzado"].map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>
        </label>
        <p className="field-help">
          La dificultad cambia los métodos en derivadas e integrales: productos, cocientes, cadena, sustitución e integración por partes. Los datos y los puntos de evaluación varían en cada ejercicio.
        </p>
        <div className="session-info">
          <span>
            Preguntas<strong>10</strong>
          </span>
          <span>
            Tiempo<strong>Sin límite</strong>
          </span>
          <span>
            Corrección<strong>Al instante</strong>
          </span>
        </div>
        {exercise && (
          <button className="button secondary" onClick={reset}>
            <RotateCcw size={16} /> Reiniciar sesión
          </button>
        )}
      </aside>
      <section className="practice-workspace" aria-label="Ejercicios">
        {!exercise ? (
          <div className="practice-welcome">
            <span className="welcome-symbol" aria-hidden="true">
              ?
            </span>
            <span className="mono-eyebrow">EL CONOCIMIENTO SE ENTRENA</span>
            <h2>
              Vamos a poner
              <br />
              <em>tus ideas a prueba.</em>
            </h2>
            <p>
              Diez preguntas, cuatro opciones y una oportunidad para entender
              algo mejor. Después de responder verás el razonamiento.
            </p>
            <button className="button primary" onClick={start}>
              Comenzar práctica <ArrowRight size={18} />
            </button>
            <small>
              Los ejercicios y sus valores se generan al azar en tu navegador.
            </small>
          </div>
        ) : finished ? (
          <div className="practice-finished">
            <GraduationCap size={40} />
            <span className="mono-eyebrow">SESIÓN COMPLETADA</span>
            <h2 ref={questionHeading} tabIndex={-1}>
              {correct} <em>de 10</em>
            </h2>
            <p>
              {correct >= 8
                ? "Buen trabajo. Puedes probar otra dificultad o explorar otro tema."
                : "Cada error señala algo que puedes practicar. Repasa las explicaciones y vuelve a intentarlo."}
            </p>
            <button className="button primary" onClick={reset}>
              Preparar otra sesión <RotateCcw size={18} />
            </button>
            <div className="attempt-review">
              <h3>Tu recorrido</h3>
              {attempts.map((a, i) => (
                <details key={i}>
                  <summary>
                    <span
                      className={
                        a.selected === a.exercise.correct
                          ? "review-ok"
                          : "review-wrong"
                      }
                    >
                      {a.selected === a.exercise.correct ? (
                        <Check size={16} />
                      ) : (
                        <X size={16} />
                      )}
                    </span>
                    <span>
                      {i + 1}. <MathText text={practiceProse(a.exercise.question)}/>
                    </span>
                  </summary>
                  <p>
                    Tu respuesta: <strong>{a.selected}</strong>. Correcta:{" "}
                    <strong>{a.exercise.correct}</strong>.
                  </p>
                  {a.exercise.latex&&<MathFormula latex={a.exercise.latex} display/>}<p><MathText text={practiceProse(a.exercise.explanation)}/></p>
                  <Link href={`/${a.exercise.topic}`}>Repasar este tema →</Link>
                </details>
              ))}
            </div>
          </div>
        ) : (
          <>
            <div className="exercise-header">
              <span className="mono-eyebrow">
                PREGUNTA{" "}
                {Math.min(attempts.length + (checked ? 0 : 1), 10)
                  .toString()
                  .padStart(2, "0")}{" "}
                / 10
              </span>
              <span>
                {correct} {correct === 1 ? "acierto" : "aciertos"}
              </span>
            </div>
            <progress
              value={attempts.length}
              max={10}
              aria-label="Preguntas respondidas"
            />
            <span className="exercise-topic">
              {catalog.find((t) => t.slug === exercise.topic)?.title} ·{" "}
              {difficulty}
            </span>
            <h2
              ref={questionHeading}
              tabIndex={-1}
              className="exercise-question"
            >
              <MathText text={practiceProse(exercise.latex?exercise.question:exerciseMath(exercise.question).text)}/>
            </h2>
            {(exercise.latex||exerciseMath(exercise.question).latex) && <div className="exercise-formula"><MathFormula latex={(exercise.latex||exerciseMath(exercise.question).latex)!} display /></div>}
            <fieldset className="answer-options" disabled={checked}>
              <legend className="sr-only">Elige una respuesta</legend>
              {exercise.options.map((option, i) => (
                <label
                  key={option}
                  className={`answer-option ${selected === option ? "chosen" : ""} ${checked && option === exercise.correct ? "right-answer" : ""} ${checked && option === selected && option !== exercise.correct ? "wrong-answer" : ""}`}
                >
                  <input
                    type="radio"
                    name="answer"
                    value={option}
                    checked={selected === option}
                    onChange={() => setSelected(option)}
                  />
                  <span className="option-letter">{"ABCD"[i]}</span>
                  <span><MathFormula latex={option.startsWith("{") ? "\\{" + option.slice(1, -1) + "\\}" : notation(option).replace(/^(-?\d+)\/(\d+)$/, "\\frac{$1}{$2}")} /></span>
                  {checked && option === exercise.correct && (
                    <Check size={20} />
                  )}
                </label>
              ))}
            </fieldset>
            {checked ? (
              <div
                className={`answer-feedback ${selected === exercise.correct ? "success" : "retry"}`}
                role="status"
              >
                <strong>
                  {selected === exercise.correct
                    ? "¡Correcto!"
                    : "La respuesta correcta es " + exercise.correct + "."}
                </strong>
                <p><MathText text={practiceProse(exercise.explanation)}/></p>{exercise.workedSteps&&<details className="practice-development" open><summary>Ver el desarrollo razonado · {exercise.workedSteps.length} pasos</summary><ol>{exercise.workedSteps.map((step,i)=><li key={i}><h3>{i+1}. {step.title}</h3><p>{step.explanation}</p>{step.latex&&<MathFormula latex={step.latex} display/>}</li>)}</ol></details>}
                <Link
                  href={`/${exercise.topic}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Repasar la herramienta ↗
                </Link>
              </div>
            ) : (
              <p className="practice-hint">
                Tómate tu tiempo. Puedes hacer los cálculos en papel.
              </p>
            )}
            <div className="exercise-actions">
              {!checked ? (
                <button
                  className="button primary"
                  disabled={!selected}
                  onClick={check}
                >
                  Comprobar respuesta <Check size={18} />
                </button>
              ) : (
                <button
                  className="button primary"
                  onClick={() =>
                    attempts.length === 10 ? setFinished(true) : next()
                  }
                >
                  {attempts.length === 10
                    ? "Ver mi resultado"
                    : "Siguiente pregunta"}{" "}
                  <ArrowRight size={18} />
                </button>
              )}
            </div>
          </>
        )}
      </section>
    </div>
  );
}
