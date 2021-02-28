import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls';
import * as THREE from 'three';
import { init } from './3d';

const welcomPage = document.getElementById('welcome') as HTMLDivElement;
const pausePage = document.getElementById('pause') as HTMLDivElement;

const enterBtn = document.getElementById('enter') as HTMLButtonElement;
const resumeBtn = document.getElementById('resume') as HTMLInputElement;
const welcomeAudioBar = document.getElementById('welcomeAudioBar') as HTMLInputElement;
const pauseAudioBar = document.getElementById('pauseAudioBar') as HTMLInputElement;

const audio = new Audio('./resources/sounds/clair_de_lune.mp3');
audio.loop = true;


let save: any;
init( loaded , {
    onLock: ( controls: PointerLockControls ) => {

        pausePage.style.display = 'none';
        audio.play();

    },

    onUnlock: ( controls: PointerLockControls ) => {
        pausePage.style.display = 'flex';
        audio.pause();
        document.body.removeEventListener('click', e => {
            controls.lock(); 
        })

        resumeBtn.onclick = () => {

            controls.lock();

        }

    }
});


const audioChange = (e: Event) => {
    audio.volume = +(e.target as HTMLInputElement).value;
    pauseAudioBar.value = welcomeAudioBar.value = ''+audio.volume;
}
pauseAudioBar.onchange = audioChange;
welcomeAudioBar.onchange = audioChange;

function loaded( renderer: THREE.WebGLRenderer, controls: PointerLockControls ) {
    
    document.getElementById('loading')!.style.opacity = '0';
    setTimeout(() => {
        document.getElementById('loading')!.style.display = 'none';
    }, 2000)
    
    // 사용자가 interect 하지 않으면 노래는 시작되지 않습니다. ( 보안 정책 )
    enterBtn.onclick = e => {
        document.onmousemove = () => {};
        audio.crossOrigin = 'anonymous';
        
        
        document.body.appendChild( renderer.domElement );
        controls.lock();
        welcomPage.style.opacity = '0';
        setTimeout(() => {
            welcomPage.style.display = 'none';
        }, 2000)
    }

}