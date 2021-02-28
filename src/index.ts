import * as THREE from 'three';
import { init } from './3d';

init( loaded );

const welcompage = document.getElementById('welcome') as HTMLDivElement;
const enterBtn = document.getElementById('enter') as HTMLButtonElement;
const welcomeAudioBar = document.getElementById('welcomeAudioBar') as HTMLInputElement;

const audio = new Audio('./resources/sounds/clair_de_lune.mp3');
audio.loop = true;

welcomeAudioBar.onchange = e => {
    audio.volume = +welcomeAudioBar.value
}

function loaded( renderer: THREE.WebGLRenderer ) {
    
    
    document.getElementById('loading')!.style.opacity = '0';
    setTimeout(() => {
        document.getElementById('loading')!.style.display = 'none';
    }, 2000)
    
    // 사용자가 interect 하지 않으면 노래는 시작되지 않습니다. ( 보안 정책 )
    enterBtn.onclick = e => {
        document.onmousemove = () => {};
        audio.crossOrigin = 'anonymous';
        audio.play();

        document.body.appendChild( renderer.domElement );
        welcompage.style.opacity = '0';
        setTimeout(() => {
            welcompage.style.display = 'none';
        }, 2000)
    }

}