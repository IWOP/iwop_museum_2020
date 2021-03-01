import {
	Euler,
	EventDispatcher,
	Vector3
} from 'three';

var MobileControls = function ( camera, domElement ) {

	if ( domElement === undefined ) {

		console.warn( 'THREE.PointerLockControls: The second parameter "domElement" is now mandatory.' );
		domElement = document.body;

	}

	this.domElement = domElement;
	this.isLocked = false;

	// Set to constrain the pitch of the camera
	// Range is 0 to Math.PI radians
	this.minPolarAngle = 0; // radians
	this.maxPolarAngle = Math.PI; // radians

	/**
	 * setting dom
	 * @author 강성우
	 */
	this._moveDom = document.createElement('div');
	this._moveDom.style.position = 'absolute';
	this._moveDom.style.display = 'none';
	this._moveDom.style.zIndex = '99';
	this._moveDom.style.left = '0';
	this._moveDom.style.bottom = '0';
	this._moveDom.style.width = '120px';
	this._moveDom.style.height = '120px';
	this._moveDom.style.margin = '10px'
	this._moveDom.style.background = 'rgba(0,0,0,0.5)';
	this._moveDom.style.borderRadius = '100%';
	this._moveDom.style.border = ' 3px solid rgba(256,256,256,0.4)';
	
	var firstMoveTouched = [0, 0]
	var nowMove = [0, 0]
	this._moveDom.ontouchmove = event => {

		event.preventDefault();

		const pageX = event.pageX || event.touches[0].pageX;
		const pageY = event.pageY || event.touches[0].pageY;

		nowMove[0] = event.touches[0].pageX - firstMoveTouched[0];
		nowMove[1] = -(event.touches[0].pageY - firstMoveTouched[1]);
		
	}
	this._moveDom.ontouchstart = event => {

		const pageX = event.pageX || event.touches[0].pageX;
		const pageY = event.pageY || event.touches[0].pageY;

		firstMoveTouched[0] = pageX;
		firstMoveTouched[1] = pageY;

	}
	this._moveDom.ontouchend = e => {

		nowMove[0] = 0;
		nowMove[1] = 0;

	}
	document.body.append( this._moveDom );

	/**
	 * pause btn
	 * @author 강성우
	 */
	this._pauseDom = document.createElement('div');
	this._pauseDom.style.position = 'absolute';
	this._pauseDom.style.display = 'none';
	this._pauseDom.style.zIndex = '99';
	this._pauseDom.style.right = '0';
	this._pauseDom.style.top = '0';
	this._pauseDom.style.width = '20px';
	this._pauseDom.style.height = '20px';
	this._pauseDom.style.margin = '10px';
	this._pauseDom.style.background = 'rgba(0,0,0,0.5)';
	this._pauseDom.style.borderRadius = '100%';
	this._pauseDom.style.border = ' 3px solid rgba(256,256,256,0.4)';
	this._pauseDom.style.color = 'white'
	this._pauseDom.style.alignItems = 'center';
	this._pauseDom.style.justifyContent = 'center';
	this._pauseDom.innerHTML = '||';
	this._pauseDom.onclick = e => {
		this.unlock();
	}
	document.body.append( this._pauseDom );






	//
	// internals
	//

	var scope = this;

	var changeEvent = { type: 'change' };
	var lockEvent = { type: 'lock' };
	var unlockEvent = { type: 'unlock' };

	var euler = new Euler( 0, 0, 0, 'YXZ' );

	var PI_2 = Math.PI / 2;

	var vec = new Vector3();

	var beforeTouch = [0,0];

	function onMouseMove( event ) {

		event.preventDefault();

		if ( scope.isLocked === false ) return;

		var movementX = beforeTouch[0] - event.touches[0].screenX;
		var movementY = beforeTouch[1] - event.touches[0].screenY;

		beforeTouch[0] = event.touches[0].screenX;
		beforeTouch[1] = event.touches[0].screenY;
		
		euler.setFromQuaternion( camera.quaternion );

		euler.y -= movementX * 0.0025;
		euler.x -= movementY * 0.0025;

		euler.x = Math.max( PI_2 - scope.maxPolarAngle, Math.min( PI_2 - scope.minPolarAngle, euler.x ) );

		camera.quaternion.setFromEuler( euler );

		scope.dispatchEvent( changeEvent );

	}

	function onMouseDown( event ) {

		scope.isLocked = true;

		beforeTouch[0] = event.touches[0].screenX;
		beforeTouch[1] = event.touches[0].screenY;

	}
	function onMouseUp() {

		scope.isLocked = false;

	}

	this.getMove = function () {

		return nowMove;

	}

	this.connect = function () {

		scope.domElement.addEventListener( 'touchmove', onMouseMove, false );
		scope.domElement.addEventListener( 'touchstart', onMouseDown, false );
		scope.domElement.addEventListener( 'touchend', onMouseUp, false );

	};

	this.disconnect = function () {

		scope.domElement.addEventListener( 'touchmove', onMouseMove, false );
		scope.domElement.addEventListener( 'touchstart', onMouseDown, false );
		scope.domElement.addEventListener( 'touchend', onMouseUp, false );

	};

	this.dispose = function () {

		this.disconnect();

	};

	this.getObject = function () { // retaining this method for backward compatibility

		return camera;

	};

	this.getDirection = function () {

		var direction = new Vector3( 0, 0, - 1 );

		return function ( v ) {

			return v.copy( direction ).applyQuaternion( camera.quaternion );

		};

	}();

	this.moveForward = function ( distance ) {

		// move forward parallel to the xz-plane
		// assumes camera.up is y-up

		vec.setFromMatrixColumn( camera.matrix, 0 );

		vec.crossVectors( camera.up, vec );

		camera.position.addScaledVector( vec, distance );

	};

	this.moveRight = function ( distance ) {

		vec.setFromMatrixColumn( camera.matrix, 0 );

		camera.position.addScaledVector( vec, distance );

	};

	this.lock = function () {

		this._moveDom.style.display = 'block';
		this._pauseDom.style.display = 'flex';

		scope.dispatchEvent( lockEvent );

	};

	this.unlock = function () {

		this._moveDom.style.display = 'none';
		this._pauseDom.style.display = 'none';

		this.dispatchEvent( unlockEvent );

	};

	document.body.style.overflow = 'hidden';

	this.connect();

};

MobileControls.prototype = Object.create( EventDispatcher.prototype );
MobileControls.prototype.constructor = MobileControls;

export { MobileControls };
