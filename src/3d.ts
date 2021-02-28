declare global {
	interface Window {
		opera: any;
	}
}
let isMobileOrTablet = false;
(function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) isMobileOrTablet = true; })(navigator.userAgent || navigator.vendor || window.opera);

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
import { Clock, Quaternion, Vector3 } from 'three';


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

let canMove = false;


// ================================== renderer 설정 =========================================================

function setRenderer() {
	
	renderer.outputEncoding = THREE.sRGBEncoding; // 블랜더 모델 색감 오류 방지
	renderer.shadowMap.enabled = true;	
	renderer.shadowMap.type = THREE.PCFSoftShadowMap;
	renderer.setSize(window.innerWidth, window.innerHeight);
	// renderer.setPixelRatio( window.devicePixelRatio );	
	// 본래 픽셀 깨짐 방지용으로 사용했지만, apple 기기에서의 프레임이 큰폭으로 하락해 끔.

    // 크기 변경
    window.onresize = () => {

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize(window.innerWidth, window.innerHeight);

    }

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
    '큐브.018'
]

function loadMuseum( onload: Function ) {

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

			setTimeout(()=>{
				canMove = true;
			}, 2000) // 미안합니다... 이렇게짜서...
			onload( renderer );
			
			animate();
	
		},
		function ( xhr ) {
			
		},
		function ( error ) {
	
			console.error( error );
	
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

const textureLoader = new THREE.TextureLoader();
const fontLoader = new THREE.FontLoader();

/**
 * 유지보수 하는 후배: 왜.... 이런코드를 짜는거지...?
 * @author 2021, 강성우: 그야.... 최적화니까.... 왜? 내가 미치기라도 한것같나?
 */
const addArtOn = function() {

	let font: THREE.Font;
	let waitingList: THREE.Mesh[] = [];

	// 폰트 바꾸고싶으면 https://gero3.github.io/facetype.js/ 여기서 json으로 형식 변경 하세요
	fontLoader.load('./resources/font/NanumMyeongjo_Regular.json', (_font) => {
			font = _font;

			for(let mesh of waitingList){
				load( mesh );
			}
		},
		console.log,
		console.error
	);

	const size = new THREE.Vector3();
	const vector3 = new THREE.Vector3();
	const box3 = new THREE.Box3();

	function load( mesh: THREE.Mesh ) {

		if( !font ) {
			waitingList.push( mesh );
			return;
		}

		const artInfo = artInfos.splice( 0, 1 )[0];
	
		// 그림 넣어주는 코드
		const material = new THREE.MeshLambertMaterial({
			map: textureLoader.load( artInfo.ThumbnailPath ),
		});
		const ratio = artInfo.ratio || 0.5;
		const geometry = new THREE.PlaneGeometry( 5.8, 5.8*ratio );
		const art = new THREE.Mesh(geometry, material);
		
		// 위치 정해주는 코드.
		art.position.copy( mesh.position );
		art.position.y = 6;
		art.position.add( new Vector3( 0, 0, 0.4 ).applyQuaternion( mesh.quaternion ) )
		art.rotation.copy( mesh.rotation );
	
		art.receiveShadow = true;

		// 이름 텍스트 정해주는 코드.
		const textMaterial = new THREE.MeshLambertMaterial();
		textMaterial.color.set( 0x00000 );
		const nameGeometry = new THREE.TextGeometry( artInfo.name, {
			font,
			size: 0.4,
			height: 0.1,
		});

		// 텍스트를 가운데로 모아줍니다. 
		const name = new THREE.Mesh( nameGeometry, textMaterial );
		box3.setFromObject( name ).getSize( size )
		name.position.copy(art.position);
		name.position.y = 4;
		name.rotation.copy( art.rotation );
		name.position.add( vector3.set( -size.x/2, 0, 0 ).applyQuaternion( mesh.quaternion ) )

		// 한게 글자수를 정하고 한계 글자수로 나누는 코드
		const detailLength = 20;

		let detailEdited: string[] = [];
		for(let i = 0; i < artInfo.detail.length / detailLength; i++){
			let endPoint = Math.min((i+1)*detailLength, artInfo.detail.length); 
			detailEdited.push( artInfo.detail.slice(i*detailLength, endPoint));
		}
		const detailGeometry = new THREE.TextGeometry( detailEdited.join('\n'), {
			font,
			size: 0.2,
			height: 0.05
		})
		
		// 메쉬 설정
		const detail = new THREE.Mesh( detailGeometry, textMaterial );
		detail.position.copy( art.position );
		detail.position.y = 4;
		detail.position.y -= size.y;
		box3.setFromObject( detail ).getSize( size )
		detail.quaternion.copy( art.quaternion );
		detail.position.add( vector3.set( -size.x/2, 0, 0 ).applyQuaternion( mesh.quaternion ) );
		
		// scene 에 추가
		scene.add( art );
		scene.add( name );
		scene.add( detail );
		
	}

	return load;
	
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
	
}

// ================================== 맨 처음 =========================================================



export function init( onload: Function ) {

	makeSkyBox();
	setRenderer();
	setController();
	addLight();
	setCamera();
	loadMuseum( onload );

}