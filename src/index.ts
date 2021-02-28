import * as THREE from 'three';
import { init } from './3d';

init( loaded );

function loaded( renderer: THREE.WebGLRenderer ) {
    
    document.getElementById('loading')!.style.opacity = '0%';
    setTimeout(() => {
        document.getElementById('loading')!.style.display = 'none';
    }, 2000)

    document.body.appendChild( renderer.domElement );
}