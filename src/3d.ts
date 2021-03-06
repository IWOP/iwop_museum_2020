/**
 * TS에 오페라 브라우저 에러 방지용.
 * @author 2021, 강성우.
 */
declare global {
	interface Window {
		opera: any;
	}
}
export let isMobileOrTablet = false;
(function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) isMobileOrTablet = true; })(navigator.userAgent || navigator.vendor || window.opera);
/**
 * IPAD를 컴퓨터로 인식 문제 해결용.
 * https://stackoverflow.com/questions/57776001/how-to-detect-ipad-pro-as-ipad-using-javascript
 * @author 2021, 강성우
 */
function isIOS(): boolean {
	if (/iPad|iPhone|iPod/.test(navigator.platform)) {
		return true;
	} else {
		return navigator.maxTouchPoints !== undefined &&
			navigator.maxTouchPoints > 2 &&
			/MacIntel/.test(navigator.platform);
	}
}
function isIpadOS(): boolean {
	return navigator.maxTouchPoints != undefined &&
		navigator.maxTouchPoints > 2 &&
		/MacIntel/.test(navigator.platform);
}
isMobileOrTablet = isMobileOrTablet || isIpadOS() || isIOS();

/**
 * @todo 코어코드를 3일 내지에 짯기때문에,
 * 의존성은 끈적하다못해 굳어버렸습니다. 의존성 해결이 필요합니다.
 * 
 * @todo 제생각에는, Blender로 모델링을 시작한순간부터 최적화가 꼬이기 시작한것 같습니다.
 * map.config.ts 등의 파일을 따로 분리하여 만들 필요가 있어보입니다.
 * 명심하십시요, Blender는 보기는 좋아보이지만 three.js의 퍼포먼스를 엄청나게 낮출 가능성이 있습니다!
 * ( 최대한 three.js 내부에서 해결하십시오. )
 * 
 * @author 2021, 강성우.
 */

import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { ConclusionManager } from './conclusion';

import { artInfos } from './art.config';
import { Clock, MeshBasicMaterial, Vector3 } from 'three';
import { MMDAnimationHelper } from 'three/examples/jsm/animation/MMDAnimationHelper';

import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls';
import { MobileControls } from './controls/MobileControls';

import { init as mmdInit, ready as MMDready } from './easterEgg';
import { mmdPause } from './index';
import { NoEmitOnErrorsPlugin } from 'webpack';



// ================================== 장소 생성 코드 =========================================================

// three.js var
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    antialias: false,
	alpha: true,
});
const clock = new Clock();
let controls: MobileControls & PointerLockControls;
if( isMobileOrTablet ){
	controls = new MobileControls( camera, renderer.domElement );
}
else{
	controls = new PointerLockControls( camera, renderer.domElement );
}
	

// my var
const keyIsDownMap: {
	[keyName: string]: boolean;
} = {}
const conclusionManager = new ConclusionManager( controls );

let canMove = false;


// ================================== renderer 설정 =========================================================

function setRenderer() {
	
	renderer.outputEncoding = THREE.sRGBEncoding; // 블랜더 모델 색감 오류 방지
	renderer.shadowMap.enabled = true;	
	renderer.shadowMap.type = THREE.PCFSoftShadowMap;
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setClearColor( 0xffffff, 0 ); 
	renderer.setPixelRatio( window.devicePixelRatio );
	// 픽셀 깨짐 방지용입니다. 모바일에서는 필수 불가결 하나
	// 컴퓨터에서는 필수가 아니니 isMobileOrTablet 에 따라 비활성화 해도 좋습니다.

    // 크기 변경
    window.onresize = () => {

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize(window.innerWidth, window.innerHeight);

    }

}


// ================================== 컨트롤러 설정 =========================================================

function setController(){

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

// 커스텀 애니메이션
function customAnimation( delta: number ) { 

    if( ObjectMap['earth'] ){
		
		if( MMDready ) {

			ObjectMap['earth'].visible = false;

		}

        ObjectMap['earth'].rotateY( -(delta / 2) );

    }

}

// ================================== skyBox =========================================================


// 스카이박스, 끄면 프레임이 상승, 텍스쳐 최적화 가능성 있음.
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
}


// ================================== 맵 로딩 =========================================================

const CAST_BAN_LIST: string[] = [
	'wall1',		// 굳이 cast 를 하지 않아도 되는것들.
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
    '큐브.018'	// 굳이 receive 하지 않아도 되는것들.
]

/**
 * 박물관 로딩 코드
 * @author 2021, 강성우
 */
function loadMuseum( onload: Function ) {

	const loader = new GLTFLoader();
	const dracoLoader = new DRACOLoader();
	dracoLoader.setDecoderPath( '/examples/js/libs/draco/' );
	loader.setDRACOLoader( dracoLoader );

	const promiseList = [];
	const frameList: THREE.Mesh[] = [];

	// 프로미스 리스트에 넣어서 준비 ( promise.all 사용 위함 )
	for( const artInfo of artInfos ){

		promiseList.push(textureLoader.loadAsync(artInfo.ThumbnailPath));

	}

	// promise.all 사용 위해 프로미스 화.
	const mapPromise = new Promise<void>((res, rej) => {

		loader.load(
			'./resources/model/iwopMuseum.glb',
			async function ( gltf ) {

				gltf.scene.matrixAutoUpdate = false;
				gltf.scene.matrixWorldNeedsUpdate = true;
	
				gltf.scene.traverse( ( node: any ) => {
	
					ObjectMap[ node.name ] = node;
	
					if( node.isMesh ){
	
						if( node.name.includes('frame') ){
							
							frameList.push( node as THREE.Mesh );

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
						
				} );

				// 퍼포먼스를 위해 자동 그림자 업데이트 막기.
				renderer.shadowMap.autoUpdate = false;
				renderer.shadowMap.needsUpdate = true;

				scene.add( gltf.scene );
	
				res();
		
			},
			()=>{},
			rej

		);

	});
	promiseList.push(mapPromise);


	Promise.all(promiseList)
	.then( photoList =>{

		animate();
		onload( renderer, controls );
		// 맵 로딩한거 제외하기
		photoList = photoList.splice( 0, photoList.length - 1 ); 

		for(let i = 0; i < photoList.length; i++) {

			artInfos[0].Thumb2Texture = photoList[i];
			addArtOn( frameList[i] );

		}

		// 최적화
		for( const i in ObjectMap ) {
	
			const object = ObjectMap[i];
			
			object.matrixAutoUpdate = false;
			object.matrixWorldNeedsUpdate = true;

			console.log(object)

		}

		// 지구
		ObjectMap['earth'].matrixAutoUpdate = true;
	
	});	
	
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

const textureLoader = new THREE.TextureLoader();

/**
 * 작품을 추가하는 함수.
 * 함수안에 함수를 넣는이유는 
 * 수학 관련 함수를 한번만 만들어 최적화를 하기 위함입니다.
 * 밖에 선언하면 충돌이 날 위험이 있습니다.
 */
const addArtOn = function() {
	
	const vector3 = new THREE.Vector3();

	// 텍스트를 캔버스로 그리고, 그걸 텍스쳐로 만들어 리턴하는 함수.
	function drawText( name: string, detail: string ) {
		// 한게 글자수를 정하고 한계 글자수로 나누는 코드
		const detailLength = 25;
		let detailEdited: string[] = [];
		for(let i = 0; i < detail.length / detailLength; i++){
			let endPoint = Math.min((i+1)*detailLength, detail.length); 
			detailEdited.push( detail.slice(i*detailLength, endPoint));
		}
		// 캔버스에 그리고 쓰는 코드
		var canvas = document.createElement('canvas') as HTMLCanvasElement;
		canvas.width = 3000;
		canvas.height = 1200;
		var ctx = canvas.getContext("2d");
		ctx!.font = '130px serif';
		ctx!.fillStyle = 'black';
		ctx!.fillText( name, 100, 200 );
		// 가상 엔터 생성
		for(let i = 0; i < detailEdited.length; i++){
			ctx!.fillText( detailEdited[i], 100, 500+200*i);
		}
		return new THREE.Texture( ctx!.canvas );
	}

	// 실제 addArtOn 함수.
	return function ( mesh: THREE.Mesh ) {
		// 정보 불러옴.
		const artInfo = artInfos.splice( 0, 1 )[0];
	
		// 그림 넣어주는 코드
		const material = new THREE.MeshLambertMaterial({
			map: artInfo.Thumb2Texture,
		});
		const ratio = artInfo.ratio || 0.5;
		const geometry = new THREE.PlaneGeometry( 5.8, 5.8*ratio );
		const art = new THREE.Mesh(geometry, material);
		
		// 위치 정해주는 코드.
		art.position.copy( mesh.position );
		art.position.y = 6;
		art.position.add( vector3.set( 0, 0, 0.4 ).applyQuaternion( mesh.quaternion ) )
		art.quaternion.copy( mesh.quaternion );
	
		art.receiveShadow = false;
	
		// 텍스트 추가 코드
		const textTexture = drawText( artInfo.name, artInfo.detail );
		textTexture.needsUpdate = true;
		const textGeometry = new THREE.PlaneGeometry( 5, 2 );
		const textMaterial = new MeshBasicMaterial({
			side: THREE.DoubleSide,
			map: textTexture,
			transparent: true
		});
		const text = new THREE.Mesh( textGeometry, textMaterial )
		text.receiveShadow = true;

		// 텍스트 위치 코드
		text.position.copy( art.position );
		text.position.y = 3.5;
		text.quaternion.copy( mesh.quaternion );

		// scene 에 추가
		scene.add( art );
		scene.add( text )
		
	}
}()


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


function move( delta: number, speed = 6 ) {
	
	if( !canMove ) return;

	fowardSpeed = 0;
	rightSpeed = 0;
	leftSpeed = 0;
	backwardSpeed = 0;

	DISTANCE = delta * speed;

	moved = false;
	// 모바일
	if ( isMobileOrTablet && controls.getMove !== undefined ) {

		const move = controls.getMove();
		
		tempForward = move[1] / 1000;
		tempRight = move[0] / 1000;

		if( move[0] !== 0 && move[1] !== 0 ){
			moved = true;
		}
		
	}
	// PC
	else{

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
	}

	// 충돌 한다면
	if( conclusionManager.isBlock( tempForward, tempRight ) ) {

		tempForward = 0;
		tempRight = 0;
		return;

	}

	// 움직였다면
	if( moved ){
		
		controls.moveForward( tempForward );
		controls.moveRight( tempRight );

	}

}

// ================================== 1 frame 마다 실행 =========================================================

let mmdHelper: MMDAnimationHelper;

function animate() {
	
	requestAnimationFrame( animate );

	const delta = clock.getDelta();

	if( mmdHelper && MMDready && !mmdPause ){
		mmdHelper.update( delta );
	}
    customAnimation( delta );
	move( delta );
	renderer.render( scene, camera );
	
}

// ================================== 맨 처음 =========================================================



export function init( onload: Function, {
	onLock,
	onUnlock
}:{
	onLock: Function,
	onUnlock: Function,
}) {

	controls.addEventListener('lock', ()=>{
		canMove = true;
		onLock( controls );
	})
	controls.addEventListener('unlock', ()=>{
		canMove = false;
		onUnlock( controls );
	})

	makeSkyBox();
	setRenderer();
	setController();
	addLight();
	setCamera();
	mmdHelper = mmdInit( scene, camera, controls );
	loadMuseum( onload );

	canMove = true;

}