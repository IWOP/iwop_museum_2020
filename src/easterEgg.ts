import * as THREE from 'three';
import { MMDLoader } from 'three/examples/jsm/loaders/MMDLoader.js';
import { MMDAnimationHelper } from 'three/examples/jsm/animation/MMDAnimationHelper.js';

import { audio as bgm } from './index';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls';

const loadingPage = document.getElementById('loading') as HTMLDivElement;
const easterEggBtn = document.getElementById('easterEgg') as HTMLButtonElement;

export let ready = false;
export let mmdAudio: THREE.Audio;

export function init(scene: THREE.Scene, camera: THREE.PerspectiveCamera, controls: PointerLockControls): MMDAnimationHelper{

    const helper = new MMDAnimationHelper();
    const loader = new MMDLoader();


    const listener = new THREE.AudioListener();
    camera.add( listener );

    console.log('init')

    easterEggBtn.onclick = () => {
        let inputed = prompt('패스워드 입력: ');
        if( inputed == '3939' ){
            correct();
        }
        else{
            alert('wrong.');
        }
    }
    
    function correct() {
        loadingPage.style.opacity = '1';
        loadingPage.style.display = 'flex';
        loader.loadWithAnimation(
            './resources/forEasterEgg/sour-M/Black.pmx', 
            './resources/forEasterEgg/wavefile_motion/wavefile_v2.vmd',
            (mmd) => {
                
                mmd.mesh.position.set(21, 1, 0);
                mmd.mesh.scale.set( 0.5, 0.5, 0.5 );
                mmd.mesh.rotateY(-Math.PI/2);

                helper.add(mmd.mesh, {
                    physics: true,
                    animation: mmd.animation,
                })
                
                
                new THREE.AudioLoader().load( 'resources/forEasterEgg/wavefile_short.mp3', function ( buffer ) {
                    
                    mmdAudio = new THREE.Audio( listener ).setBuffer( buffer );
                    
                    controls.lock();
                    bgm.pause();
                    helper.add( mmdAudio , {
                        delayTime: 160 / 30, 
                    });
                    
                    scene.add( mmd.mesh );
                    
                    mmdAudio.setVolume( +(document.getElementById('pauseAudioBar') as HTMLInputElement).value )
                    
                    ready = true;

                    loadingPage.style.opacity = '0';
                    setTimeout(()=>{
                        loadingPage.style.display = 'none';
                    }, 2000);

                }, ()=>{}, console.error );
                
            }, function (xhr) {
                console.log((xhr.loaded / xhr.total * 100) + '% loaded');
            }, console.error
        );
    }

    return helper;

}