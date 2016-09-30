//SHOW OBJ BEFORE THE DECIMATION

      var objData;
      var clock = new THREE.Clock();
      var delta = clock.getDelta(); // seconds.
      var rotateAngle = Math.PI / 2 * delta;   // pi/2 radians (90 degrees) per second
      var container, stats;
      function visualizeObjPrev(objData)
      {

        var camera, scene, renderer, controls;

        var mouseX = 0, mouseY = 0;

        var windowHalfX = window.innerWidth / 2;
        var windowHalfY = window.innerHeight / 2;


        init();
        animate();


        function init() 
        {

          //container = document.createElement( 'div' );
          container = document.getElementById("objprevisualizacion");
          document.body.appendChild( container );

          camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
          camera.position.z = 600;

          // scene
          scene = new THREE.Scene();

          var ambient = new THREE.AmbientLight( 0x101030 );
          scene.add( ambient );

          var directionalLight = new THREE.DirectionalLight( 0xffeedd );
          directionalLight.position.set( 0, 0, 1 );
          scene.add( directionalLight );

          // texture
          var manager = new THREE.LoadingManager();
          manager.onProgress = function ( item, loaded, total ) {

            console.log( item, loaded, total );

          };

          // model
            var loader = new THREE.OBJLoader();
          // Add a localtext parameter and an if check if url == ""
            loader.load =   function load( url, localtext, onLoad, onProgress, onError ) {
            var scope = this;
            var loader = new THREE.XHRLoader( scope.manager );
            loader.setPath( this.path );
            loader.load( url, function ( text ) {
                if (url==""){
                    text = localtext;
                }
                onLoad( scope.parse( text ) );
            }, onProgress, onError );
        },

          // Now you can use either url or directly string input.
          loader.load( '', objData, function ( object ) {
              object.traverse( function ( child ) {
                  if ( child instanceof THREE.Mesh ) {
                    //MORE INFORMATION
                  }
              } );
              object.scale.x = 50;
              object.scale.y = 50;
              object.scale.z = 50;
              var obj = object;
              scene.add( obj );
          });


          renderer = new THREE.WebGLRenderer();
          renderer.setSize( window.innerWidth, window.innerHeight);
          container.appendChild( renderer.domElement );

          document.addEventListener( 'mousemove', onDocumentMouseMove, false );

          window.addEventListener( 'resize', onWindowResize, false );
          controls = new THREE.OrbitControls(camera, renderer.domElement);

        }

        function onWindowResize()
        {
          windowHalfX = window.innerWidth / 2;
          windowHalfY = window.innerHeight / 2;

          camera.aspect = window.innerWidth / window.innerHeight;
          camera.updateProjectionMatrix();

          renderer.setSize( window.innerWidth, window.innerHeight );
        }

        function onDocumentMouseMove( event ) 
        {
          mouseX = ( event.clientX - windowHalfX ) / 2;
          mouseY = ( event.clientY - windowHalfY ) / 2;
        }

        function animate() 
        {
          requestAnimationFrame( animate );
          render();
        }

        function render() 
        {

          /*camera.position.x += ( mouseX - camera.position.x ) * .5;
          camera.position.y += ( - mouseY - camera.position.y ) * .5;

          camera.lookAt( scene.position );*/

          renderer.render( scene, camera );
          controls.update();
        }
      }


      function readSingleFile(evt) {
          //Retrieve the first (and only!) File from the FileList object
          var f = evt.target.files[0]; 

          if (f) {
            var r = new FileReader();
            r.onload = function(e) { 
                  objData = e.target.result;
                  visualizeObjPrev(objData);  
            }
            r.readAsText(f);
          } else { 
            alert("Failed to load file");
          }
      }

          document.getElementById('file').addEventListener('change', readSingleFile, false);

      function deleteScenePrev()
      {
        scene = null;
        camera = null;
        container.removeChild(renderer.domElement);
      }