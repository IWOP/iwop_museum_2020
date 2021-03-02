import * as THREE from 'three';
import { MMDLoader } from 'three/examples/jsm/loaders/MMDLoader.js';
import { MMDAnimationHelper } from 'three/examples/jsm/animation/MMDAnimationHelper.js';

import { audio as bgm } from './index';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls';

const loadingPage = document.getElementById('loading') as HTMLDivElement;
const easterEggBtn = document.getElementById('easterEgg') as HTMLButtonElement;

export let ready = false;
export let mmdAudio: THREE.Audio;

/**
 * @todo ios 기기들에서 사운드가 플레이되지 않음 ( 어려움 )
 * @todo 의존성 줄이기. ( 어려움 )
 * 
 * @author 2021, 강성우
 */

// 맨 처음 init ( 모델을 추가하는게 아님 )
export function init(scene: THREE.Scene, camera: THREE.PerspectiveCamera, controls: PointerLockControls): MMDAnimationHelper{

    // mmd var
    const helper = new MMDAnimationHelper();
    const loader = new MMDLoader();
    const audioLoader = new THREE.AudioLoader();
    const listener = new THREE.AudioListener();
    camera.add( listener );

    easterEggBtn.onclick = () => {
        let inputed = prompt('패스워드 입력: ');
        if( inputed == '3939' ){
            correct();
        }
        else{
            alert('wrong.');
        }
    }
    
    // 비밀번호 맞았을때
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
                
                
                audioLoader.load( './resources/forEasterEgg/wavefile_short.mp3', function ( buffer ) {
                    
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