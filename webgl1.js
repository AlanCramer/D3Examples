
var gl,
	shaderProgram;

initGL();
createShaders();

draw();

function initGL() {
	var canvas = document.getElementById('canvas');
	gl = canvas.getContext('webgl');

	gl.viewport(0,0,canvas.width, canvas.height);
	gl.clearColor(1,1,1,1); // rgba


}

function createShaders() {

	var vs = "";
	vs += 'void main(void) {';
	vs += '  gl_Position = vec4(0.0, 0.0, 0.0, 1.0);';
	vs += '  gl_PointSize = 10.0;';
	vs += '}';

	var vertexShader = gl.createShader(gl.VERTEX_SHADER);
	gl.shaderSource (vertexShader, vs);
	gl.compileShader(vertexShader);

    var frs = "";
    frs += 'void main(void) {';
    frs += '  gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);';
    frs += '}'; 

    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, frs);
    gl.compileShader(fragmentShader);

    shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);

    gl.linkProgram(shaderProgram);
    gl.useProgram(shaderProgram);
}


function draw() {

	gl.clear(gl.COLOR_BUFFER_BIT);
	gl.drawArrays(gl.POINTS, 0, 1);
}