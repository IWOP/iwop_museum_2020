/**
 * 
 * @author 2021, 강성우.
 */

import * as THREE from 'three';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { ConclusionManager } from './conclusion';

import { artInfos } from './art.config';
import { Clock } from 'three';


// ================================== 장소 생성 코드 =========================================================

// three.js var
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    antialias: false,
});
const clock = new Clock();
const controls = new PointerLockControls( camera, renderer.domElement);

// my var
const keyIsDownMap: {
	[keyName: string]: boolean;
} = {}
const conclusionManager = new ConclusionManager( controls );


// ================================== renderer 설정 =========================================================

function setRenderer() {
	
	renderer.outputEncoding = THREE.sRGBEncoding; // 블랜더 모델 색감 오류 방지
	renderer.shadowMap.enabled = true;	
	renderer.shadowMap.type = THREE.PCFSoftShadowMap;
	renderer.setSize(window.innerWidth, window.innerHeight);
	// renderer.setPixelRatio( window.devicePixelRatio );	// apple 기기에서의 pixel ratio 기하학적 상승으로 끔.

    // 크기 변경
    window.onresize = () => {

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize(window.innerWidth, window.innerHeight);

    }

	document.body.appendChild( renderer.domElement );

}


// ================================== 컨트롤러 설정 =========================================================

function setController(){

	document.body.addEventListener('click', e => {
		
		controls.lock();

	})

	document.body.addEventListener('keydown', e => {

		keyIsDownMap[ e.code ] = true;

	})

	document.body.addEventListener('keyup', e => {

		keyIsDownMap[ e.code ] = false;

	})


}

// ================================== 커스텀 에니메이션 ================================================


let ObjectMap: {
    [ name: string ]: THREE.Mesh | THREE.Object3D
} = {};

function customAnimation( delta: number ) { 

    if( ObjectMap['earth'] ){

        ObjectMap['earth'].rotateY( -(delta / 2) );

    }

}

// ================================== skyBox =========================================================


function makeSkyBox() {

    const loader = new THREE.TextureLoader();
    const texture = loader.load(
        './resources/images/skyboxes/02.jpg',
        () => {

            const rt = new THREE.WebGLCubeRenderTarget(texture.image.height);
            rt.fromEquirectangularTexture(renderer, texture);
            scene.background = rt;

        }

    )
    // scene.background = new THREE.Color(0xdfdfdf);
    // 끄면 프레임이 상승 할 수도 있음...

}


// ================================== 맵 로딩 =========================================================

const CAST_BAN_LIST: string[] = [
	'wall1',
	'wall1.001',
	'wall1.002',
	'wall1.003',
	'wall1.004',
	'wall2',
	'wall3',
	'wall4',
	'텍스트',
	'top-plane',
	'큐브.020',
	'큐브.021',
    '큐브.018'
]

const RECEIVE_BAN_LIST: string[] = [
	'earth',	// 문자가 회전하며 그림자가 남음.
	'텍스트',
    '큐브.018'
]

function loadMuseum() {

	const loader = new GLTFLoader();
	const dracoLoader = new DRACOLoader();
	dracoLoader.setDecoderPath( '/examples/js/libs/draco/' );
	loader.setDRACOLoader( dracoLoader );

	loader.load(
		'./resources/model/iwopMuseum.glb',
		function ( gltf ) {

			// console.log(gltf.scene);

			scene.add( gltf.scene );

			gltf.scene.traverse( ( node: any ) => {

                ObjectMap[ node.name ] = node;

				if( node.isMesh ){

					if( node.name.includes('frame') ){
					
						addArtOn( node as THREE.Mesh );

					}	
					
					if( !CAST_BAN_LIST.includes( node.name ) ) {

						node.castShadow = true; 

					}
					if( !RECEIVE_BAN_LIST.includes( node.name ) ) {

						node.receiveShadow = true;
						
					}

					conclusionManager.addCheck( node );

				}
                // 이름으로 판단합니다. 이름에 꼭 light를 넣어야 불빛이 나옵니다.
				else if( node.name.includes('Light') ){

					addLightOn( 
						node.position.x,
						node.position.y,
						node.position.z,
					)

				}

			} )
			
			// 퍼포먼스를 위해 자동 그림자 업데이트 막기.
			renderer.shadowMap.autoUpdate = false;
			renderer.shadowMap.needsUpdate = true;
			
			animate();
	
		},
		function ( xhr ) {
	
			console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
	
		},
		function ( error ) {
	
			console.log( 'An error happened' );
	
		}

	);

}


// ================================== 불빛 추가 =========================================================

const COLOR = 0xFFFFFF;
const INTENSITY = 1;
const LIGHT_DISTANCE = 40;


function addLightOn( x:number, y:number, z:number ) {

	const light = new THREE.PointLight( COLOR, INTENSITY, LIGHT_DISTANCE );

	light.position.set( x, y, z );

	// shadow map 치명적 오류 방지
	light.shadow.bias = -0.001;
	light.shadow.mapSize.set( 512, 512 );

	light.castShadow = true;
	scene.add(light);
}


function addLight() {

	const LIGHT_POSITION: number[][] = [];

	// 수동으로 저장한 위치에 따라 불빛을 생성
	for( const pos of LIGHT_POSITION ) {
        
		addLightOn( pos[0], pos[1], pos[2] )

	}
	
	// 전역광, 그림자가 겹칠시 너무 동 떨어지게 어두운것을 방지해준다.
	const AmbientLight = new THREE.AmbientLight( 0xFFFFFF, 0.1 );
	scene.add(AmbientLight);

}

// ================================== 작품 전시 ==========================================================

function addArtOn( mesh: THREE.Mesh ) {
	
}


// ================================== 카메라 설정 =========================================================

function setCamera() {

	// 카메라 초기 위치 설정
	camera.position.x = -18;
	camera.position.y = 5;
	controls.getObject().lookAt( 0, 5, 0 );

}

// ================================== 이동, 충돌 =========================================================

let DISTANCE = 0.05;

let fowardSpeed = 0;
let backwardSpeed = 0;
let rightSpeed = 0;
let leftSpeed = 0;

let tempForward = 0;
let tempRight = 0;

let moved = false;


function move( delta: number ) {

	fowardSpeed = 0;
	rightSpeed = 0;
	leftSpeed = 0;
	backwardSpeed = 0;

	DISTANCE = delta * 6;

	moved = false;
	if( keyIsDownMap['KeyW'] ) {

		fowardSpeed = DISTANCE;
		moved = true;

	}
	if( keyIsDownMap['KeyA'] ) {

		leftSpeed = DISTANCE;
		moved = true;
		
	}
	if( keyIsDownMap['KeyS'] ) {

		backwardSpeed = DISTANCE;
		moved = true;

	}
	if( keyIsDownMap['KeyD'] ) {

		rightSpeed = DISTANCE;
		moved = true;

	}
	if( keyIsDownMap['ShiftLeft'] ) {

		fowardSpeed *= 2;
		rightSpeed *= 2;
		leftSpeed *= 2;
		backwardSpeed *= 2;

	}

	tempForward =  fowardSpeed - backwardSpeed;
	tempRight = rightSpeed - leftSpeed;

	if( conclusionManager.isBlock( tempForward, tempRight ) ) {

		tempForward = 0;
		tempRight = 0;
		return;

	}
	
	if( moved ){
		
		controls.moveForward( tempForward );
		controls.moveRight( tempRight );

	}

}

// ================================== 1 frame 마다 실행 =========================================================

function animate() {
	const delta = clock.getDelta();
	
	requestAnimationFrame( animate );
    customAnimation( delta );
	move( delta );
	renderer.render( scene, camera );
	
	// console.log(renderer.info.render, delta)
}

// ================================== 맨 처음 =========================================================



export function init() {

	makeSkyBox();
	setRenderer();
	setController();
	addLight();
	setCamera();
	loadMuseum();

}