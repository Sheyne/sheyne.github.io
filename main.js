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
define("display", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class PairView {
        constructor(func, editor) {
            this.table = document.createElement("table");
            this.row = document.createElement("tr");
            this.head = document.createElement("td");
            this.value = document.createElement("td");
            editor.map.set(func, this);
            this.row.appendChild(this.head);
            this.row.appendChild(this.value);
            this.table.appendChild(this.row);
            this.value.classList.add("value-cell");
            this.table.addEventListener("click", (e) => {
                editor.active = func;
                editor.selection = undefined;
                e.stopPropagation();
                editor.draw();
            });
            this.head.innerHTML = func.name;
            if (func === editor.active) {
                if (editor.selection === undefined) {
                    this.table.style.backgroundColor = "#aaf";
                }
                else {
                    this.head.innerHTML = func.name.slice(0, editor.selection) +
                        "<span id='cursor'></span>" +
                        func.name.slice(editor.selection);
                }
            }
            if (func.args !== undefined) {
                let horizontal = true;
                let containsActive = false;
                for (const f of func.args) {
                    if (f.args !== undefined) {
                        horizontal = false;
                    }
                    if (f === editor.active) {
                        containsActive = true;
                    }
                }
                horizontal = (func.horizontal === true || horizontal) && !containsActive;
                this.toFunction();
                for (const f of func.args) {
                    this.add(new PairView(f, editor), horizontal);
                }
            }
        }
        toFunction() {
            this.args = document.createElement("td");
            this.row.appendChild(this.args);
            this.args.classList.add("args");
            this.row.appendChild(this.value);
        }
        add(child, horiz) {
            let toAdd = child.table;
            if (horiz) {
                const cell = document.createElement("td");
                cell.classList.add("horiz-component");
                cell.appendChild(child.table);
                toAdd = cell;
            }
            if (this.args === undefined) {
                throw new Error("invariant violated");
            }
            this.args.appendChild(toAdd);
        }
    }
    exports.PairView = PairView;
});
define("editor", ["require", "exports", "display", "language"], function (require, exports, display_1, language_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function makePair() {
        return { name: "" };
    }
    function hasArgs(pair) {
        return pair.args !== undefined;
    }
    function addParentConnections(parent) {
        if (hasArgs(parent)) {
            for (const element of parent.args) {
                element.parent = parent;
                if (element.args !== undefined) {
                    addParentConnections(element);
                }
            }
        }
    }
    function uglyCodeToInvokeWorkers(editor) {
        let prevWorker;
        const cachedResults = new Map();
        function isDeadResult(x) {
            return typeof (x) === "object" && x !== null && !!(x.message);
        }
        function redrawValues() {
            const flat = language_1.flattenIdxToPair(editor.root);
            for (let [idx, value] of cachedResults) {
                const pair = flat.get(idx);
                if (pair === undefined) {
                    console.log("wierd behavior 737162");
                    continue;
                }
                const view = editor.map.get(pair);
                if (view === undefined) {
                    console.log("wierd behavior 37482");
                    continue;
                }
                if (isDeadResult(value)) {
                    view.table.classList.add("dead-result");
                    value = "Error: " + value.message;
                }
                view.value.innerHTML = "" + value;
            }
        }
        editor.ondraw = () => {
            redrawValues();
        };
        editor.onedit = () => {
            if (prevWorker !== undefined) {
                prevWorker.terminate();
            }
            document.getElementById("code").innerHTML = "processing";
            const testWorker = new Worker("worker-starter.js?5");
            prevWorker = testWorker;
            cachedResults.clear();
            testWorker.addEventListener("message", (msg) => {
                const [idx, value] = JSON.parse(msg.data);
                cachedResults.set(idx, value);
                redrawValues();
            });
            const codeString = language_1.toString(editor.root);
            testWorker.postMessage(codeString);
            document.getElementById("code").innerHTML = codeString;
        };
        editor.onedit();
    }
    class EditorView {
        constructor(program) {
            this.map = new Map();
            this.container = document.createElement("div");
            this.root = { name: "" };
            this.active = this.root;
            this.selection = undefined;
            this.container.tabIndex = 0;
            this.container.addEventListener("keydown", (e) => {
                this.onkeydown(e);
            });
            this.container.addEventListener("keypress", (e) => {
                this.onkeypress(e);
            });
            this.container.addEventListener("focus", (e) => {
                if (this.active === undefined) {
                    this.active = this.root;
                    this.draw();
                }
            });
            this.container.addEventListener("blur", (e) => {
                this.active = undefined;
                this.draw();
            });
            this.program = program;
            uglyCodeToInvokeWorkers(this);
        }
        set program(prog) {
            addParentConnections(prog);
            this.root = prog;
        }
        draw() {
            this.map.clear();
            const startNode = new display_1.PairView(this.root, this);
            this.container.innerHTML = "";
            this.container.appendChild(startNode.table);
            if (this.ondraw !== undefined) {
                this.ondraw();
            }
        }
        constrainSelection() {
            if (this.active === undefined) {
                return;
            }
            if (this.selection !== undefined) {
                if (this.selection > this.active.name.length) {
                    this.selection = this.active.name.length;
                }
            }
        }
        onkeydown(e) {
            if (this.active === undefined) {
                return;
            }
            if (e.keyCode === 37) {
                this.constrainSelection();
                if (this.selection !== undefined) {
                    if (this.selection === 0) {
                        this.left();
                        this.selection = undefined;
                    }
                    else {
                        this.selection -= 1;
                    }
                }
                else {
                    this.left();
                }
                e.preventDefault();
            }
            if (e.keyCode === 38) {
                this.up();
                e.preventDefault();
            }
            if (e.key === "b" && e.ctrlKey && e.altKey) {
                this.active.horizontal = this.active.horizontal !== true;
                e.preventDefault();
            }
            if (e.keyCode === 39) {
                this.constrainSelection();
                if (this.selection !== undefined) {
                    this.selection += 1;
                    if (this.selection === this.active.name.length + 1) {
                        this.selection = undefined;
                        this.right();
                    }
                }
                else {
                    this.right();
                }
                e.preventDefault();
            }
            if (e.keyCode === 40) {
                this.down();
                e.preventDefault();
            }
            if (e.keyCode === 8) {
                // delete
                e.preventDefault();
                this.constrainSelection();
                if (this.selection !== undefined) {
                    if (this.selection !== 0) {
                        this.active.name = this.active.name.substring(0, this.selection - 1) +
                            this.active.name.substring(this.selection);
                        this.selection -= 1;
                    }
                    else {
                        const parent = this.active.parent;
                        if (parent !== undefined) {
                            const index = parent.args.indexOf(this.active);
                            if (index > 0) {
                                const newActive = parent.args[index - 1];
                                if (newActive.args !== undefined) {
                                    this.selection = undefined;
                                    this.active = newActive.args[0];
                                }
                                else {
                                    const oldActive = this.active;
                                    newActive.args = oldActive.args;
                                    this.selection = newActive.name.length;
                                    newActive.name += oldActive.name;
                                    this.active = newActive;
                                    parent.args.splice(index, 1);
                                }
                            }
                        }
                    }
                }
                else {
                    if (this.active.name !== "") {
                        this.active.name = "";
                    }
                    else {
                        const parent = this.active.parent;
                        if (parent !== undefined) {
                            const idx = (parent.args).indexOf(this.active);
                            parent.args.splice(idx, 1);
                            if (parent.args.length === 0) {
                                this.active = parent;
                                parent.args = undefined;
                            }
                            else {
                                this.active = parent.args[Math.max(0, idx - 1)];
                            }
                        }
                        this.selection = undefined;
                    }
                }
                if (this.onedit !== undefined) {
                    this.onedit();
                }
            }
            this.draw();
        }
        up() {
            if (this.active === undefined) {
                return;
            }
            const p = this.active.parent;
            if (p !== undefined) {
                const idx = p.args.indexOf(this.active);
                this.active = p.args[Math.max(idx - 1, 0)];
            }
        }
        down() {
            if (this.active === undefined) {
                return;
            }
            const p = this.active.parent;
            if (p !== undefined) {
                const idx = p.args.indexOf(this.active);
                this.active = p.args[Math.min(idx + 1, p.args.length - 1)];
            }
        }
        left() {
            if (this.active === undefined) {
                return;
            }
            if (this.active.parent !== undefined) {
                this.active = this.active.parent;
            }
        }
        right() {
            if (this.active === undefined) {
                return;
            }
            if (this.active.args !== undefined && this.active.args[0] !== undefined) {
                this.active = this.active.args[0];
            }
        }
        addCellNear(element, offset) {
            const parent = element.parent;
            if (parent !== undefined) {
                const index = parent.args.indexOf(element);
                const newElement = makePair();
                newElement.parent = parent;
                parent.args.splice(index + offset, 0, newElement);
                return newElement;
            }
        }
        addCellByCursor() {
            if (this.active === undefined) {
                return;
            }
            const newElement = this.addCellNear(this.active, 0);
            if (newElement !== undefined) {
                newElement.name = this.active.name.slice(0, this.selection);
                this.active.name = this.active.name.slice(this.selection);
                this.selection = 0;
            }
        }
        onkeypress(e) {
            if (this.active === undefined) {
                return;
            }
            if (e.keyCode === 40) {
                // open paren
                let newElement;
                if (this.selection !== undefined) {
                    newElement = {
                        name: this.active.name.substring(this.selection),
                        args: this.active.args,
                    };
                    this.active.name = this.active.name.substring(0, this.selection);
                    this.selection = 0;
                }
                else {
                    if (this.active.args !== undefined) {
                        this.active = this.active.args[0];
                    }
                    else {
                        newElement = makePair();
                    }
                }
                if (newElement !== undefined) {
                    this.active.args = [newElement];
                    if (hasArgs(this.active)) {
                        newElement.parent = this.active;
                    }
                    this.active = newElement;
                }
                this.selection = undefined;
            }
            else if (e.keyCode === 41) {
                this.active = this.addCellNear(this.active, 1);
                this.selection = 0;
            }
            else if (e.keyCode === 44) {
                // ,
                this.addCellByCursor();
            }
            else if (e.keyCode === 13) {
                if (this.selection === undefined) {
                    this.selection = this.active.name.length;
                }
                else {
                    this.addCellByCursor();
                }
            }
            else if (e.keyCode === 8) {
                // delete
                return;
            }
            else if (e.keyCode === 27) {
                this.selection = undefined;
            }
            else if (e.key === "b" && e.altKey) {
                return;
            }
            else {
                this.constrainSelection();
                if (this.selection === undefined) {
                    this.active.name = String.fromCharCode(e.keyCode);
                    this.selection = 1;
                }
                else {
                    this.active.name = this.active.name.slice(0, this.selection) +
                        String.fromCharCode(e.keyCode) +
                        this.active.name.slice(this.selection);
                    this.selection += 1;
                }
            }
            if (this.onedit !== undefined) {
                this.onedit();
            }
            this.draw();
        }
    }
    exports.EditorView = EditorView;
});
define("main", ["require", "exports", "editor"], function (require, exports, editor_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const program = { name: "letrec", args: [{ name: "inc", args: [{ name: "lambda", args: [{ name: "", args: [{ name: "x" }] }, { name: "+", args: [{ name: "x" }, { name: "1" }] }] }] }, { name: "sum", args: [{ name: "lambda", args: [{ name: "", args: [{ name: "low" }, { name: "high" }, { name: "func" }, { name: "accum" }] }, { name: "if", args: [{ name: ">", args: [{ name: "low" }, { name: "high" }] }, { name: "accum" }, { name: "sum", args: [{ name: "inc", args: [{ name: "low" }] }, { name: "high" }, { name: "func" }, { name: "+", args: [{ name: "accum" }, { name: "func", args: [{ name: "low" }] }] }] }] }] }] }, { name: "sum", args: [{ name: "1" }, { name: "3" }, { name: "lambda", args: [{ name: "", args: [{ name: "x" }] }, { name: "*", args: [{ name: "x" }, { name: "x" }] }] }, { name: "0" }] }] };
    const editor1 = new editor_1.EditorView({ name: "+", args: [{ name: "1" }, { name: "5" }, { name: "2" }] });
    const editor2 = new editor_1.EditorView({
        name: "letrec",
        args: [
            { name: "C", args: [{ name: "4" }] },
            {
                name: "f", args: [
                    {
                        name: "lambda", args: [
                            { name: "", args: [{ name: "x" }] },
                            { name: "+", args: [{ name: "x" }, { name: "C" }] },
                        ],
                    }
                ],
            },
            { name: "f", args: [{ name: "7" }] },
        ],
    });
    const editor3 = new editor_1.EditorView(program);
    const editor4 = new editor_1.EditorView({
        name: "index", args: [
            { name: "list", args: [{ name: "1" }, { name: "2" }, { name: "5" }] },
            { name: "2" },
        ],
    });
    const editor5 = new editor_1.EditorView({ args: [{ name: "'hello " }, { args: [{ args: [{ name: "1" }, { name: "2" }], name: "+" }], name: "->string" }], name: "concat" });
    editor1.draw();
    editor2.draw();
    editor3.draw();
    editor4.draw();
    editor5.draw();
    window.document.getElementById("container1").appendChild(editor1.container);
    window.document.getElementById("container2").appendChild(editor2.container);
    window.document.getElementById("container3").appendChild(editor3.container);
    window.document.getElementById("container4").appendChild(editor4.container);
    window.document.getElementById("container5").appendChild(editor5.container);
});
