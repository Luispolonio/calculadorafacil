/* Local, isolated learning runtime. The parent can terminate this worker. */
let runtime;
self.onmessage=async(event)=>{
 const {code,tests,mode}=event.data;
 try{
  if(!runtime){self.postMessage({type:'loading'});importScripts('/python-runtime/pyodide.js');runtime=await self.loadPyodide({indexURL:'/python-runtime/'});}
  self.postMessage({type:'running'});
  const scope=runtime.toPy({student_source:code,case_json:JSON.stringify(tests||[]),run_mode:mode});
  const response=await runtime.runPythonAsync(`
import json, io, contextlib, traceback, math, copy

class LimitedOutput(io.StringIO):
    def write(self, value):
        remaining = max(0, 12000 - self.tell())
        super().write(value[:remaining])
        return len(value)

def equivalent(actual, expected):
    if isinstance(expected, bool):
        return isinstance(actual, bool) and actual == expected
    if isinstance(expected, (int, float)) and not isinstance(expected, bool):
        return isinstance(actual, (int, float)) and not isinstance(actual, bool) and math.isfinite(actual) and math.isclose(actual, expected, rel_tol=1e-9, abs_tol=1e-9)
    if isinstance(expected, list):
        return isinstance(actual, list) and len(actual) == len(expected) and all(equivalent(a, b) for a, b in zip(actual, expected))
    if isinstance(expected, dict):
        return isinstance(actual, dict) and actual.keys() == expected.keys() and all(equivalent(actual[k], expected[k]) for k in expected)
    return type(actual) is type(expected) and actual == expected

output = LimitedOutput()
results = []
error = None
namespace = {"__name__": "__student__"}
try:
    with contextlib.redirect_stdout(output), contextlib.redirect_stderr(output):
        exec(compile(student_source, "tu_programa.py", "exec"), namespace)
        if run_mode == "verify":
            fn = namespace.get("resolver")
            if not callable(fn):
                raise ValueError("Define una función llamada resolver con los parámetros del enunciado.")
            for case in json.loads(case_json):
                try:
                    actual = fn(*copy.deepcopy(case["args"]))
                    expected = case["expected"]
                    results.append({"passed": equivalent(actual, expected), "actual": repr(actual)[:1000], "expected": repr(expected), "args": repr(case["args"]), "reason": case["reason"]})
                except Exception:
                    results.append({"passed": False, "actual": traceback.format_exc(limit=3)[-2000:], "expected": repr(case["expected"]), "args": repr(case["args"]), "reason": case["reason"]})
except Exception:
    error = traceback.format_exc(limit=4)[-4000:]
json.dumps({"output": output.getvalue(), "results": results, "error": error}, ensure_ascii=False)
`,{globals:scope});
  scope.destroy();self.postMessage({type:'result',...JSON.parse(response)});
 }catch(error){self.postMessage({type:'error',error:String(error.message||error)});}
};
