define("language", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Lisp;
    (function (Lisp) {
        class DeadResult {
            constructor(message) {
                this.message = message;
            }
        }
        Lisp.DeadResult = DeadResult;
        const list = (args, context, info) => {
            const res = [];
            for (const e of args) {
                const v = Lisp.evallisp(e, context, info);
                if (v instanceof DeadResult) {
                    return v;
                }
                res.push(v);
            }
            return res;
        };
        const exprToString = (args, context, info) => {
            if (args.length !== 1) {
                return new DeadResult("->string needs exactly 1 argument");
            }
            const a = Lisp.evallisp(args[0], context, info);
            return "" + a;
        };
        exprToString.funcName = "->string";
        exprToString.numArgs = 1;
        const index = (args, context, info) => {
            if (args.length !== 2) {
                return new DeadResult("index needs exactly two arguments");
            }
            const a = Lisp.evallisp(args[0], context, info);
            if (a instanceof DeadResult) {
                return a;
            }
            if (typeof (a) !== "object" || !Array.isArray(a)) {
                return new DeadResult("0th argument must be a list");
            }
            const b = evalnumber(args[1], context, info, "index");
            if (b instanceof DeadResult) {
                return b;
            }
            if (a[b] === undefined) {
                return new DeadResult(b + " not in range");
            }
            return a[b];
        };
        index.numArgs = 2;
        const concat = (args, context, info) => {
            let res = "";
            for (const e of args) {
                const v = Lisp.evallisp(e, context, info);
                if (v instanceof DeadResult) {
                    return v;
                }
                if (typeof (v) !== "string") {
                    return new DeadResult("can only concat strings");
                }
                res += v;
            }
            return res;
        };
        const plus = (args, context, info) => {
            let res = 0;
            for (const e of args) {
                const v = evalnumber(e, context, info, "add");
                if (v instanceof DeadResult) {
                    return v;
                }
                res += v;
            }
            return res;
        };
        const evalnumber = (e, context, info, message) => {
            const v = Lisp.evallisp(e, context, info);
            if (v instanceof DeadResult) {
                return v;
            }
            if (typeof (v) !== "number") {
                return new DeadResult("can only '" + message + "' numbers");
            }
            return v;
        };
        const lessthan = (args, context, info) => {
            return binaryMath((a, b) => {
                return a < b;
            }, args, context, info, "<");
        };
        lessthan.numArgs = 2;
        const greaterthan = (args, context, info) => {
            return binaryMath((a, b) => {
                return a > b;
            }, args, context, info, ">");
        };
        greaterthan.numArgs = 2;
        const equalto = (args, context, info) => {
            return binaryMath((a, b) => {
                return a === b;
            }, args, context, info, "=");
        };
        equalto.numArgs = 2;
        const minus = (args, context, info) => {
            return binaryMath((a, b) => {
                return a - b;
            }, args, context, info, "-");
        };
        minus.numArgs = 2;
        const divide = (args, context, info) => {
            return binaryMath((a, b) => {
                return a / b;
            }, args, context, info, "/");
        };
        divide.numArgs = 2;
        const binaryMath = (op, args, context, info, name) => {
            const res = 0;
            if (args.length !== 2) {
                return new DeadResult(name + " needs exactly two arguments");
            }
            const a = evalnumber(args[0], context, info, name);
            const b = evalnumber(args[1], context, info, name);
            if (a instanceof DeadResult) {
                return a;
            }
            if (b instanceof DeadResult) {
                return b;
            }
            return op(a, b);
        };
        const times = (args, context, info) => {
            let res = 1;
            for (const e of args) {
                const v = evalnumber(e, context, info, "multiply");
                if (v instanceof DeadResult) {
                    return v;
                }
                res *= v;
            }
            return res;
        };
        const iff = (args, context, info) => {
            const v = Lisp.evallisp(args[0], context, info);
            if (v instanceof DeadResult) {
                return v;
            }
            if (v !== true && v !== false) {
                return new DeadResult("argument to if must be boolean");
            }
            if (v) {
                return Lisp.evallisp(args[1], context, info);
            }
            else {
                return Lisp.evallisp(args[2], context, info);
            }
        };
        iff.numArgs = 3;
        const letrec = (args, context, info) => {
            const newContext = {
                parentContext: context,
                members: {},
            };
            for (const arg of args.slice(0, args.length - 1)) {
                if (arg.args === undefined) {
                    return new DeadResult("binding '" + arg.name + "' must have a body");
                }
                newContext.members[arg.name] = Lisp.evallisp(arg.args[0], newContext, info);
            }
            return Lisp.evallisp(args[args.length - 1], newContext, info);
        };
        const lambda = (outerArgs, outerContext, info) => {
            const argNames = [];
            const [arg1, arg2] = outerArgs;
            if (arg1.args === undefined) {
                return new DeadResult("the first argument to a lambda must have arguments");
            }
            for (const name of arg1.args) {
                argNames.push(name.name);
            }
            const lambdaFunc = (args, context, info) => {
                const newContext = { parentContext: context, members: {} };
                for (let i = 0; i < argNames.length; i++) {
                    newContext.members[argNames[i]] = Lisp.evallisp(args[i], context, info);
                }
                return Lisp.evallisp(arg2, newContext, info);
            };
            lambdaFunc.numArgs = argNames.length;
            return lambdaFunc;
        };
        lambda.numArgs = 2;
        const calllisp = (func, args, context, info) => {
            if (func instanceof DeadResult) {
                return func;
            }
            else if (typeof (func) !== "function") {
                return new DeadResult("calling a non-function");
            }
            else if (func.numArgs !== undefined && func.numArgs !== args.length) {
                return new DeadResult("arity error");
            }
            else {
                return func(args, context, info);
            }
        };
        const evalf = (args, context, info) => {
            const func = Lisp.evallisp(args[0], context, info);
            return calllisp(func, args.slice(1), context, info);
        };
        Lisp.defaultContext = {
            parentContext: undefined,
            members: {
                "false": false,
                "true": true,
                "+": plus,
                "*": times,
                "<": lessthan,
                ">": greaterthan,
                "=": equalto,
                "-": minus,
                "/": divide,
                "if": iff,
                "lambda": lambda,
                "𝜆": lambda,
                "eval": evalf,
                "letrec": letrec,
                "concat": concat,
                "list": list,
                "index": index,
                "->string": exprToString,
            },
        };
        const lookup = (name, context, info) => {
            let maybeContext = context;
            while (maybeContext !== undefined) {
                const ctx = maybeContext.members[name];
                if (ctx !== undefined) {
                    return ctx;
                }
                maybeContext = maybeContext.parentContext;
            }
            return new DeadResult("variable '" + name + "' not found");
        };
        Lisp.evallisp = (el, context, info) => {
            let res;
            if (el.args === undefined) {
                if (el.name === "") {
                    res = "";
                }
                else if (el.name[0] === "'") {
                    res = el.name.slice(1);
                }
                else if (!isNaN(Number(el.name))) {
                    res = Number(el.name);
                }
                else {
                    res = lookup(el.name, context, info);
                }
            }
            else {
                res = lookup(el.name, context, info);
                res = calllisp(res, el.args, context, info);
            }
            if (info.callback !== undefined) {
                info.callback(el, res);
            }
            return res;
        };
    })(Lisp = exports.Lisp || (exports.Lisp = {}));
    const traversal = (prog, flat, idx) => {
        flat(prog, idx[0]);
        idx[0]++;
        if (prog.args === undefined) {
            return;
        }
        for (const func of prog.args) {
            traversal(func, flat, idx);
        }
    };
    exports.flattenPairToIdx = (prog) => {
        const flat = new Map();
        traversal(prog, (a, b) => flat.set(a, b), [0]);
        return flat;
    };
    exports.flattenIdxToPair = (prog) => {
        const flat = new Map();
        traversal(prog, (a, b) => flat.set(b, a), [0]);
        return flat;
    };
    exports.toString = (prog) => {
        return JSON.stringify(prog, ["args", "name"]);
    };
});
define("worker", ["require", "exports", "language"], function (require, exports, language_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    addEventListener("message", (evt) => {
        const prog = JSON.parse(evt.data);
        const flat = language_1.flattenPairToIdx(prog);
        const info = {
            callback: (a, b) => {
                if (typeof (b) === "function") {
                    if (b.name) {
                        b = b.name;
                    }
                    else {
                        b = "Lambda";
                    }
                }
                postMessage(JSON.stringify([flat.get(a), b]));
            }
        };
        language_1.Lisp.evallisp(prog, language_1.Lisp.defaultContext, info);
        close();
    });
});
