import * as THREE from 'three';
import { Euler, Quaternion, Vector3 } from 'three';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls';
import { Raycaster } from 'three/src/core/Raycaster'


// 충돌 관할 클래스
export class ConclusionManager{

    // public
    control: PointerLockControls;
    rayCaster: Raycaster;
    objects: Array<THREE.Object3D>;
    camera: THREE.Camera;

    // private
    _checkHeight = 0.5;
    _direction = new Vector3();
    
    // for math
    euler = new Euler();
    quaternion = new Quaternion();


    constructor( control: PointerLockControls ) {

        this.control = control;
        this.rayCaster = new THREE.Raycaster( new THREE.Vector3(), new THREE.Vector3( 1, 0, 0 ), 0, 1 );
        this.objects = [];

        this.camera = control.getObject();

    }

    // 충돌 체크에 오브젝트 추가
    addCheck( newObject: THREE.Object3D ) {

        this.objects.push( newObject );

    }

    // 가고있는 방향이 막혔나 확인
    isBlock(front: number, right: number) {

        if(front===0 && right === 0) return;

        this._direction.set( 0, 0, 0 );

        this._direction.x = front;
        this._direction.z = right;
        this._direction.applyQuaternion(this.camera.quaternion);
        var temp = this._direction.z;
        this._direction.z = -(this._direction.x /2);
        this._direction.x = temp /2;
        this._direction.y = 0;
        this._direction.normalize();
        
        this.rayCaster.set(
            this.camera.position,
            this._direction
        );
            
        this.rayCaster.ray.origin.y = this._checkHeight;

        const intersection = this.rayCaster.intersectObjects( this.objects );
        return intersection.length > 0;

    }

}