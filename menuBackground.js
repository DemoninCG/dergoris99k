const backgroundCanvas = document.getElementById('backgroundCanvas');
const glm = backgroundCanvas.getContext('webgl') || backgroundCanvas.getContext('experimental-webgl');

let fragmentShaderSourceMenu = `
    #define MAX 100.
    #define EPS 4e-4

    precision highp float;

    uniform vec2 u_resolution;
    uniform float u_time;
    uniform vec3 u_backgroundcolor;

    #define MAX 100.
    #define EPS 4e-4

    // Classic pseudo-random hash
    float hash(vec2 p) {
        return fract(sin(p.x * 75.3 + p.y * 94.2) * 4952.);
    }

    // Bi-cubic value noise
    float value(vec2 p) {
        vec2 f = floor(p);
        vec2 s = p - f;
        s *= s * (3.0 - 2.0 * s);
        vec2 o = vec2(0, 1);
        
        return mix(mix(hash(f + o.xx), hash(f + o.yx), s.x),
                mix(hash(f + o.xy), hash(f + o.yy), s.x), s.y);
    }

    // Approximate SDF from fractal value noise
    float dist(vec3 p) {
        vec2 n = p.xz * 0.6 + 1.0;
        mat2 m = mat2(0.6754904, 0.7373688, -0.7373688, 0.6754904) * 2.0;
        float weight = 0.3;
        float water = 0.0;
        float speed = 0.2;
        for (int i = 0; i < 10; i++) {
            water += smoothstep(0.1, 0.9, value(n + speed * u_time)) * weight;
            n *= m;
            speed *= 1.3;
            weight *= 0.45;
        }
        return (water + 0.5 - p.y);
    }

    // Compute normals from SDF derivative
    vec3 normal(vec3 p) {
        vec2 e = vec2(4, -4) * EPS;
        return normalize(dist(p + e.yxx) * e.yxx + dist(p + e.xyx) * e.xyx +
                        dist(p + e.xxy) * e.xxy + dist(p + e.yyy) * e.yyy);
    }

    // Main water rendering function
    vec4 renderWater(vec2 fragCoord) {
        vec3 ray = normalize(vec3(fragCoord * 2.0 - u_resolution.xy, u_resolution.x));
        ray.yz *= mat2(cos(0.5 + vec4(0, 11, 33, 0)));
        vec3 pos = vec3(u_time * 0.2, 0, 0);
        vec4 mar = vec4(pos, 0);
        
        for (int i = 0; i < 50; i++) {
            float stp = dist(mar.xyz);
            mar += vec4(ray, 1) * stp;
            
            if (stp < EPS || mar.w > MAX) break;
        }
        vec3 nor = normal(mar.xyz);
        vec3 sun = normalize(vec3(0, -1, 9));
        vec3 ref = refract(ray, nor, 1.333);
        float spec = exp(dot(ref, sun) * 9.0 - 9.0);
        float fog = max(1.0 - mar.w / MAX, 0.0);

        return vec4(vec3(sqrt(spec) * fog), 1.0 - 2.0 / mar.w);
    }

    // Combined main function
    void main() {
        // Get the fragment coordinates from the built-in variable
        vec2 fragCoord = gl_FragCoord.xy;

        // Render the water first
        vec4 waterColor = renderWater(fragCoord);

        // Apply the chromatic aberration and bokeh pass
        vec4 finalColor = vec4(u_backgroundcolor / 255.0, 1.0);

        // Combine the water and bokeh effect
        gl_FragColor = mix(waterColor, finalColor, 0.8);
    }

`;

let shaderProgramMenu, resolutionUniformLocationMenu, timeUniformLocationMenu, backgroundColorUniformLocation;

// Function to create a shader
function createShader(glm, type, source) {
    const shader = glm.createShader(type);
    glm.shaderSource(shader, source);
    glm.compileShader(shader);
    if (!glm.getShaderParameter(shader, glm.COMPILE_STATUS)) {
        console.error('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
        console.error('Shader source:', source);
        glm.deleteShader(shader);
        return null;
    }
    return shader;
}

// Function to create and link a shader program
function createShaderProgram(glm, vertexSource, fragmentSource) {
    const vertexShader = createShader(glm, glm.VERTEX_SHADER, vertexSource);
    const fragmentShader = createShader(glm, glm.FRAGMENT_SHADER, fragmentSource);
    
    const program = glm.createProgram();
    glm.attachShader(program, vertexShader);
    glm.attachShader(program, fragmentShader);
    glm.linkProgram(program);

    //if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    //    console.error('Error linking program:', gl.getProgramInfoLog(program));
    //    return null;
    //}

    
    return program;
}
  
const vertexBufferMenu = glm.createBuffer();
glm.bindBuffer(glm.ARRAY_BUFFER, vertexBufferMenu);
glm.bufferData(glm.ARRAY_BUFFER, vertices, glm.STATIC_DRAW);

// Function to initialize the shader program
function initShaderProgram() {
    shaderProgramMenu = createShaderProgram(glm, vertexShaderSource, fragmentShaderSourceMenu);
    
    if (!shaderProgramMenu) return;
    console.time("Shader load");
    glm.useProgram(shaderProgramMenu);
    console.timeEnd("Shader load");
    const a_position = glm.getAttribLocation(shaderProgramMenu, 'a_position');
    glm.bindBuffer(glm.ARRAY_BUFFER, vertexBufferMenu);
    glm.enableVertexAttribArray(a_position);
    glm.vertexAttribPointer(a_position, 2, glm.FLOAT, false, 0, 0);

    resolutionUniformLocationMenu = glm.getUniformLocation(shaderProgramMenu, 'u_resolution');
    timeUniformLocationMenu = glm.getUniformLocation(shaderProgramMenu, 'u_time');
    backgroundColorUniformLocation = glm.getUniformLocation(shaderProgramMenu, 'u_backgroundcolor');
}

// Initialize shaders and buffer
initShaderProgram();    

let backgroundColor = [80, 120, 120];
let backgroundColorDestination = [80, 120, 120];
let backgroundDisabledMenu = false;
function renderMenu(timestamp) {
    if (backgroundDisabledMenu) { requestAnimationFrame(renderMenu); return; }
    backgroundCanvas.width = window.innerWidth / 4;
    backgroundCanvas.height = window.innerHeight / 4;
    glm.uniform2f(resolutionUniformLocationMenu, backgroundCanvas.width, backgroundCanvas.height);
    glm.uniform1f(timeUniformLocationMenu, timestamp / 1000.0);
    //Smooth interpolation for the background color to the destination
    for (let i = 0; i < 3; i++) {
        backgroundColor[i] = backgroundColor[i] + (backgroundColorDestination[i] - backgroundColor[i]) * 0.15;
    }
    glm.uniform3f(backgroundColorUniformLocation,  Math.round(backgroundColor[0]), Math.round(backgroundColor[1]), Math.round(backgroundColor[2]));
    glm.clearColor(0.0, 0.0, 0.0, 1.0);
    glm.clear(glm.COLOR_BUFFER_BIT);
    glm.viewport(0, 0, backgroundCanvas.width, backgroundCanvas.height);
    glm.drawArrays(glm.TRIANGLE_STRIP, 0, 4);
    requestAnimationFrame(renderMenu);
}

requestAnimationFrame(renderMenu);

// Function to update the fragment shader
function updateFragmentShader(newShaderSource) {
    fragmentShaderSourceMenu = newShaderSource;
    
    // Recompile and re-link the shader program
    initShaderProgram();
}