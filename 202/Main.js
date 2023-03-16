

function init() {

    // Escena
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);    
    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0x000000, 1.0);
    renderer.setSize(window.innerWidth, window.innerHeight);

    var size = 700;
    var arrowSize = 40;
    var divisions = 20;
    var origin = new THREE.Vector3( 0, 0, 0 );
    var x = new THREE.Vector3( 1, 0, 0 );
    var y = new THREE.Vector3( 0, 1, 0 );
    var z = new THREE.Vector3( 0, 0, 1 );
    var color2 = new THREE.Color( 0x333333 );  /// 0x333333
    var colorR = new THREE.Color( 0xAA0000 );
    var colorG = new THREE.Color( 0x00AA00 );
    var colorB = new THREE.Color( 0x0000AA );

    //Crear la Grilla
    var gridHelperXZ = new THREE.GridHelper( size, divisions, color2, color2);

    //Flechas
    var arrowX = new THREE.ArrowHelper( x, origin, arrowSize, colorR );
    var arrowY = new THREE.ArrowHelper( y, origin, arrowSize, colorG );
    var arrowZ = new THREE.ArrowHelper( z, origin, arrowSize, colorB );
        
    //Cámara
    camera.position.x = 000;
    camera.position.y = 100;
    camera.position.z = 300;
    camera.lookAt(scene.position);

    //Creación de las Figuras
    //Piramide #1
    lado = 30;
    h = 45;
    [v1, v2, v3, v4, v5] = [[0,0,0],[lado,0,0],[lado,0,lado],[0,0,lado],[lado/2,h,lado/2]];
    var vertices = [v1,v2,v3,v4,v5,v1,v4,v3,v5,v2];
    geomPiramide = Geometria(vertices);

    //Colores para las  piramides
    color = [{color:0xFF0000},{color:0x0fFF00},{color:0x00FFFF},{color:0x0FFFFF}];


    //Material
    material = [];
    for (i=0; i<4; i++) {
        material.push = (new THREE.ParticleBasicMaterial(color[i]));
    }


    //Figuras para las piramides
    piramide = [];
    vt = [0,0,0];

    for (i=0; i<4; i++) {
        piramide.push(new THREE.Line(geomPiramide, material[i]));
        piramide[i].applyMatrix(RotacionX(0));
        piramide[i].applyMatrix(Traslacion(vt));
    }


    //Girar la segunda piramide
    RotacionRealX(piramide[1],vt,(Grados_a_Radianes(45)));
    RotacionRealY(piramide[2],vt,(Grados_a_Radianes(45)));
    RotacionRealZ(piramide[3],vt,(Grados_a_Radianes(45)));
    

    /*
    //Escalado
    vp = [2,2,2];
    vs = [2,2,2];

    EscaladoReal(piramide[2],vp,vs);

    //Traslacion
    vt = [50,0,50]
    TraslacionReal(piramide[3],vt);
    */




    // En el documento HTML
    document.body.appendChild(renderer.domElement);

    // Agregar elementos al escenario
    scene.add(gridHelperXZ);
    scene.add(arrowX);	
    scene.add(arrowY);	
    scene.add(arrowZ);
    for (i=0;i<4;i++){
        scene.add(piramide[i]);
    }
    renderer.render(scene, camera);
}

init();  // otra forma: window.onload = init;
