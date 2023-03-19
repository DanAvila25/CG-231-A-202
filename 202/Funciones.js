/**
 * Grados_a_Radianes: Convierte un angulo en grados a radianes
 * Entradas: grados = valor de angulo en grados
 * Salidas:  grados * (pi/180) = Realiza la operacion de conversion y retorna el valor
 */
function Grados_a_Radianes(grados)
{
  var pi = Math.PI;
  return grados * (pi/180);
}

/**
 * Geometria: Construye una geometria threejs y la retorna
 * Entradas: vx = Arreglo de vertices para la geometria: (Arreglo de arreglos)
 * Salidas:  Geom = Geometria generada a partir de vx
 */
function Geometria(vx) {
    Geom = new THREE.Geometry();
    var largoVertice = vx.length;
    for (i = 0; i < largoVertice; i++) {
        [x,y,z] = [vx[i][0],vx[i][1],vx[i][2]]
        vector = new THREE.Vector3(x, y, z);
        Geom.vertices.push(vector);
    }
    return Geom;
}


/**
 * Traslacion: le aplica al vector la matriz de traslacion y retorna el vector traslacion
 * Entradas: vt = vector traslacion (array de numeros enteros)
 * Salidas:  matrizT = Matriz de traslacion para el vector vt
 */
function Traslacion(vt) {
    var matrizT = new THREE.Matrix4();
    matrizT.set(1, 0, 0, vt[0],
                0, 1, 0, vt[1],
                0, 0, 1, vt[2],
                0, 0, 0, 1);
    return matrizT;
}
/**
 * TraslacionReal: Construye la matriz de traslacion a partir del objeto "obj"
 * Entradas: obj = Objeto tipo Three.line que represental en objeto grafico
 *           vt = vector traslacion (array de numeros enteros)
 */
function TraslacionReal(obj, vt) {

    obj.applyMatrix(Traslacion(vt));
}

/**
 * Escalado: Construye la matriz de escalado Threejs para el vector vs y la retorna
 * Entradas: vs = vector de escalado  (array de numeros enteros)
 * Salidas:  matrizS = Matriz de escalado para el vector vs
 */
function Escalado(vs) {
    var matrizS = new THREE.Matrix4();
    matrizS.set(vs[0],     0,     0, 0,
                    0, vs[1],     0, 0,
                    0,     0, vs[2], 0,
                    0,     0,     0, 1);
    return matrizS;
}

/**
 * EscaladoReal: Construye la matriz de escalado a partir del objeto "obj"
 * Entradas: obj = Objeto tipo Three.line que represental en objeto grafico
 *           vp = Posicion incial de fig (array de enteros)
 *           vs = vector de escalado  (array de numeros enteros)
 */
function EscaladoReal(obj, vp, vs) {
    vt = [-vp[0],-vp[1],-vp[2]]; //Vector para llegar al origen
    obj.applyMatrix(Traslacion(vt));
    obj.applyMatrix(Escalado(vs));
    obj.applyMatrix(Traslacion(vp));
}
/**
 * RotacionX: Construye la matriz de rotacion para el eje X a partir del angulo
 * Entradas: angle = angulo de rotacion en el eje X
 * Salidas:  matrizRx = Matriz de rotacion para el angulo "angle"
 */
function RotacionX(angle){
    var matrizRx = new THREE.Matrix4();
    var alpha = angle;
    var cs = Math.cos(alpha);
    var ss = Math.sin(alpha);

    matrizRx.set(1,  0,   0, 0,
                 0, cs, -ss, 0,
                 0, ss,  cs, 0,
                 0,  0,   0, 1);
    return matrizRx
}
/**
 * RotacionY: Construye la matriz de rotacion para el eje Y a partir del angulo
 * Entradas: angle = angulo de rotacion en el eje Y
 * Salidas:  matrizRy = Matriz de rotacion para el angulo "angle"
 */
function RotacionY(angle){
    var matrizRy = new THREE.Matrix4();
    var alpha = angle;
    var cs = Math.cos(alpha);
    var ss = Math.sin(alpha);

    matrizRy.set( cs,  0, ss, 0,
                   0,  1,  0, 0,
                 -ss,  0, cs, 0,
                   0,  0,  0, 1);
    return matrizRy
}
/**
 * RotacionZ: Construye la matriz de rotacion para el eje Z a partir del angulo
 * Entradas: angle = angulo de rotacion en el eje Z
 * Salidas:  matrizRz = Matriz de rotacion para el angulo "angle"
 */
function RotacionZ(angle){
    var matrizRz = new THREE.Matrix4();
    var alpha = angle;
    var cs = Math.cos(alpha);
    var ss = Math.sin(alpha);

    matrizRz.set(  cs, -ss,  0, 0,
                   ss,  cs,  0, 0,
                    0,   0,  1, 0,
                    0,   0,  0, 1);
    return matrizRz
}
/**
 * RotacionRealX: Aplica las funciones para la rotacion X a partir del objeto "obj"
 *                no retorna nada pues se imprime directamente desde esta funcion.
 * Entradas: obj = Objeto tipo Three.line que represental en objeto grafico
 *           vp = Posicion incial de fig (array de enteros)
 *           angle = angulo de rotacion en el eje X
 */
function RotacionRealX(obj, vp, angle){
    vt = [-vp[0],-vp[1],vp[2]];
    obj.applyMatrix(Traslacion(vt));
    obj.applyMatrix(RotacionX(angle));
    obj.applyMatrix(Traslacion(vp));
}
/**
 * RotacionRealY: Aplica las funciones para la rotacion Y a partir del objeto "obj"
 *                no retorna nada pues se imprime directamente desde esta funcion.
 * Entradas: obj = Objeto tipo Three.line que represental en objeto grafico
 *           vp = Posicion incial de fig (array de enteros)
 *           angle = angulo de rotacion en el eje Y
 */
function RotacionRealY(obj, vp, angle){
    vt = [-vp[0],-vp[1],vp[2]];
    obj.applyMatrix(Traslacion(vt));
    obj.applyMatrix(RotacionY(angle));
    obj.applyMatrix(Traslacion(vp));
}
/**
 * RotacionRealZ: Aplica las funciones para la rotacion Z a partir del objeto "obj"
 *                no retorna nada pues se imprime directamente desde esta funcion.
 * Entradas: obj = Objeto tipo Three.line que represental en objeto grafico
 *           vp = Posicion incial de fig (array de enteros)
 *           angle = angulo de rotacion en el eje Z
 */
function RotacionRealZ(obj, vp, angle){
    vt = [-vp[0],-vp[1],vp[2]];
    obj.applyMatrix(Traslacion(vt));
    obj.applyMatrix(RotacionZ(angle));
    obj.applyMatrix(Traslacion(vp));
}

