const gameCanvas = document.getElementById('gameCanvas');
const gl = gameCanvas.getContext('webgl') || gameCanvas.getContext('experimental-webgl');

const vertexShaderSource = `
            attribute vec4 a_position;
            void main() {
                gl_Position = a_position;
            }
        `;

let fragmentShaderSource = `
    // Created by greenbird10
    // License Creative Commons Attribution-NonCommercial-ShareAlike 3.0

    precision mediump float;

    uniform vec2 u_resolution;
    uniform float u_time;
    uniform vec3 u_seacolor;
    uniform vec3 u_wavecolor;

    float hash(vec2 p) {
        return 0.5 * (sin(dot(p, vec2(271.319, 413.975)) + 1217.13 * p.x * p.y)) + 0.5;
    }

    float noise(vec2 p) {
        vec2 w = fract(p);
        w = w * w * (3.0 - 2.0 * w);
        p = floor(p);
        return mix(
            mix(hash(p + vec2(0, 0)), hash(p + vec2(1, 0)), w.x),
            mix(hash(p + vec2(0, 1)), hash(p + vec2(1, 1)), w.x), w.y
        );
    }

    float map_octave(vec2 uv) {
        uv = (uv + noise(uv)) / 2.5;
        uv = vec2(uv.x * 0.6 - uv.y * 0.8, uv.x * 0.8 + uv.y * 0.6);
        vec2 uvsin = 1.0 - abs(sin(uv));
        vec2 uvcos = abs(cos(uv));
        uv = mix(uvsin, uvcos, uvsin);
        float val = 1.0 - pow(uv.x * uv.y, 0.65);
        return val;
    }

    float map(vec3 p) {
        vec2 uv = p.xz + u_time / 2.0;
        float amp = 0.6, freq = 2.0, val = 0.0;
        for (int i = 0; i < 3; ++i) {
            val += map_octave(uv) * amp;
            amp *= 0.3;
            uv *= freq;
        }
        uv = p.xz - 1000.0 - u_time / 2.0;
        amp = 0.6, freq = 2.0;
        for (int i = 0; i < 3; ++i) {
            val += map_octave(uv) * amp;
            amp *= 0.3;
            uv *= freq;
        }
        return val + 3.0 - p.y;
    }

    vec3 getNormal(vec3 p) {
        float eps = 1.0 / u_resolution.x;
        vec3 px = p + vec3(eps, 0.0, 0.0);
        vec3 pz = p + vec3(0.0, 0.0, eps);
        return normalize(vec3(map(px), eps, map(pz)));
    }

    float raymarch(vec3 ro, vec3 rd, out vec3 outP, out float outT) {
        float l = 0.0, r = 26.0;
        int steps = 16;
        float dist = 1000000.0;
        for (int i = 0; i < 16; ++i) {
            float mid = (r + l) / 2.0;
            float mapmid = map(ro + rd * mid);
            dist = min(dist, abs(mapmid));
            if (mapmid > 0.0) {
                l = mid;
            } else {
                r = mid;
            }
            if (r - l < 1.0 / u_resolution.x) break;
        }
        outP = ro + rd * l;
        outT = l;
        return dist;
    }

    float fbm(vec2 n) {
        float total = 0.0, amplitude = 1.0;
        for (int i = 0; i < 5; i++) {
            total += noise(n) * amplitude; 
            n += n;
            amplitude *= 0.4; 
        }
        return total;
    }

    float lightShafts(vec2 st) {
        float angle = -0.2;
        vec2 _st = st;
        float t = u_time / 16.0;
        st = vec2(st.x * cos(angle) - st.y * sin(angle), 
                st.x * sin(angle) + st.y * cos(angle));
        float val = fbm(vec2(st.x * 2.0 + 200.0 + t, st.y / 4.0));
        val += fbm(vec2(st.x * 2.0 + 200.0 - t, st.y / 4.0));
        val = val / 3.0;
        float mask = pow(clamp(1.0 - abs(_st.y - 0.15), 0.0, 1.0) * 0.49 + 0.5, 2.0);
        mask *= clamp(1.0 - abs(_st.x + 0.2), 0.0, 1.0) * 0.49 + 0.5;
        return pow(val * mask, 2.0);
    }

    vec2 bubble(vec2 uv, float scale) {
        if (uv.y > 0.2) return vec2(0.0);
        float t = u_time / 4.0;
        vec2 st = uv * scale;
        vec2 _st = floor(st);
        vec2 bias = vec2(0.0, 4.0 * sin(_st.x * 128.0 + t));
        float mask = smoothstep(0.1, 0.2, -cos(_st.x * 128.0 + t));
        st += bias;
        vec2 _st_ = floor(st);
        st = fract(st);
        float size = noise(_st_) * 0.07 + 0.01;
        vec2 pos = vec2(noise(vec2(t, _st_.y * 64.1)) * 0.8 + 0.1, 0.5);
        if (length(st.xy - pos) < size) {
            return (st + pos) * vec2(0.1, 0.2) * mask;
        }
        return vec2(0.0);
    }

    void main() {
        vec2 fragCoord = gl_FragCoord.xy;
        vec3 ro = vec3(0.0, 0.0, 2.0);
        vec3 lightPos = vec3(8.0, 3.0, -3.0);
        vec3 lightDir = normalize(lightPos - ro);

        // adjust uv
        vec2 uv = fragCoord;
        uv = (-u_resolution.xy + 2.0 * uv) / u_resolution.y;
        uv.y *= 0.5;
        uv.x *= 0.45;
        uv += bubble(uv, 12.0) + bubble(uv, 24.0); // add bubbles

        vec3 rd = normalize(vec3(uv, -1.0));
        vec3 hitPos;
        float hitT;
        vec3 seaColor = u_seacolor / 255.0;
        vec3 color;
        
        // waves
        float dist = raymarch(ro, rd, hitPos, hitT);
        float diffuse = dot(getNormal(hitPos), rd) * 0.5 + 0.5;
        color = mix(seaColor, u_wavecolor / 255.0, diffuse);
        color += pow(diffuse, 12.0);

        // refraction
        vec3 ref = normalize(refract(hitPos - lightPos, getNormal(hitPos), 0.05));
        float refraction = clamp(dot(ref, rd), 0.0, 1.0);
        color += vec3(245.0, 250.0, 220.0) / 400.0 * 0.6 * pow(refraction, 1.5);

        vec3 col = vec3(0.0);
        col = mix(color, seaColor, pow(clamp(0.0, 1.0, dist), 0.2)); // glow edge
        col += vec3(225.0, 230.0, 200.0) / 255.0 * lightShafts(uv); // light shafts

        // tone map
        col = (col * col + sin(col)) / vec3(1.8, 1.8, 1.9);
        
        // vignette
        vec2 q = fragCoord / u_resolution.xy;
        col *= 0.7 + 0.3 * pow(16.0 * q.x * q.y * (1.0 - q.x) * (1.0 - q.y), 0.2);

        gl_FragColor = vec4(col, 1.0);
    }
`;

let shaderProgram, resolutionUniformLocation, timeUniformLocation, seaColorUniformLocation, waveColorUniformLocation;
let vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);

// Function to create a shader
function createShader(gl, type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
        console.error('Shader source:', source);
        gl.deleteShader(shader);
        return null;
    }
    return shader;
}

// Function to create and link a shader program
function createShaderProgram(gl, vertexSource, fragmentSource) {
    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentSource);
    
    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    //if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    //    console.error('Error linking program:', gl.getProgramInfoLog(program));
    //    return null;
    //}

    
    return program;
}

const vertices = new Float32Array([
    -1, -1,
    1, -1,
    -1, 1,
    1, 1
  ]);
  
  const vertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

// Function to initialize the shader program
function initShaderProgram() {
    shaderProgram = createShaderProgram(gl, vertexShaderSource, fragmentShaderSource);
    
    if (!shaderProgram) return;
    console.time("Shader load");
    gl.useProgram(shaderProgram);
    console.timeEnd("Shader load");
    const a_position = gl.getAttribLocation(shaderProgram, 'a_position');
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.enableVertexAttribArray(a_position);
    gl.vertexAttribPointer(a_position, 2, gl.FLOAT, false, 0, 0);

    resolutionUniformLocation = gl.getUniformLocation(shaderProgram, 'u_resolution');
    timeUniformLocation = gl.getUniformLocation(shaderProgram, 'u_time');
    seaColorUniformLocation = gl.getUniformLocation(shaderProgram, 'u_seacolor');
    waveColorUniformLocation = gl.getUniformLocation(shaderProgram, 'u_wavecolor');
}

// Initialize shaders and buffer
initShaderProgram();    

let seaColor = [11, 72, 142];
let waveColor = [15, 120, 152];
let backgroundDisabled = false;
function render(timestamp) {
    if (backgroundDisabled) { requestAnimationFrame(render); return; }
    gameCanvas.width = window.innerWidth / 4;
    gameCanvas.height = window.innerHeight / 4;
    gl.uniform2f(resolutionUniformLocation, gameCanvas.width, gameCanvas.height);
    gl.uniform1f(timeUniformLocation, timestamp / 1000.0);
    gl.uniform3f(seaColorUniformLocation,  seaColor[0], seaColor[1], seaColor[2]);
    gl.uniform3f(waveColorUniformLocation, waveColor[0], waveColor[1], waveColor[2]);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.viewport(0, 0, gameCanvas.width, gameCanvas.height);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    requestAnimationFrame(render);
}

requestAnimationFrame(render);

// Function to update the fragment shader
function updateFragmentShader(newShaderSource) {
    fragmentShaderSource = newShaderSource;
    
    // Recompile and re-link the shader program
    initShaderProgram();
}

let fragmentShaderTest = `

`;