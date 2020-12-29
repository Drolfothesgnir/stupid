import transformKoch from "./Fractals/Koch.js";
import createElement from "./utilities/createElement.js";
import { degToRad, radToDeg } from "./utilities/degreeConversion.js";
import draw from "./utilities/draw.js";
import Point from "./utilities/Point.js";

const root = document.getElementById("root")!;

const canvas = createElement("canvas", { width: "800", height: "600" });
const ctx = canvas.getContext("2d")!;
root.appendChild(canvas);

// draw(ctx, points);
