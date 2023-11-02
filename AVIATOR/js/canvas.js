let canvas = document.getElementById( "myCanvas" )
	, ctx = canvas.getContext( "2d" )
	, langBtn = document.querySelector( ".curent" )
	, langBtnText = document.querySelector( ".curent p" )
	, langList = document.querySelector( ".lang_list" )
	, threeangle = document.querySelector( ".curent span" )
	, text = document.querySelector( ".text" )
	, startBtn = document.querySelector( ".btn" )
	, moneyNum = document.querySelector( ".input p span" )
	, minusBtn = document.querySelector( ".minus" )
	, plusBtn = document.querySelector( ".plus" )
	, modal = document.querySelector( ".modal" )
	, modalText1 = document.querySelector( ".modal p:nth-child(1)" )
	, modalText2 = document.querySelector( ".modal p:nth-child(2)" )
	, modalText3 = document.querySelector( ".modal p:nth-child(3)" )
	, modalBtn = document.querySelector( ".modal a" )
	, container = document.querySelector( ".container" )
	, betting = document.querySelectorAll( ".betting" )
	, listElems = document.querySelectorAll( ".lang_list li" )
	, animationRequestId = null
	, num = 0
	, modificateValue = 0
	, selectedBetting = 0
	, gameCount = 0;

function calculateY ( t ) {
	return .5 * t * t / 2
}

function calculateIntegral ( t, e, n ) {
	const a = ( e - t ) / n;
	let i = 0;
	for ( let e = 0; e < n; e++ ) {
		i += calculateY( t + e * a ) * a
	}
	return i
}
const canvasWidth = 9e2
	, canvasHeight = 600;
canvas.width = canvasWidth, canvas.height = canvasHeight;
const scaleX = canvasWidth / 1e3
	, scaleY = canvasHeight / 30e4;
let animationStartTime;
const animationDuration = 1e4;
let progress = 0;
const integralThreshold = 1e4
	, image = new Image;
image.src = "images/plain.webp";
const imageWidth = 230
	, imageHeight = 200;

function integrate ( t ) {
	return calculateIntegral( 0, t, 1e3 )
}

function shouldStopAnimation ( t ) {
	return t >= 2e3 && t <= 4e3 ? Math.random( ) < .005 : t > 3e3
}

function formatProgress ( t ) {
	return ( 10 * t )
	.toFixed( 2 )
}

function animate ( t ) {
	animationStartTime || ( animationStartTime = t );
	const e = t - animationStartTime;
	if ( progress = e / animationDuration, progress <= 1 && !shouldStopAnimation( e ) ) {
		ctx.clearRect( 0, 0, canvasWidth, canvasHeight ),
		ctx.beginPath( ), 
		ctx.moveTo( 0, canvasHeight );
		const t = 2e3 * progress;
		
		for ( let e = 0; e <= t; e++ ) {
			const t = calculateY( e );
			ctx.lineTo( e * scaleX, canvasHeight - t * scaleY )
		}

		ctx.strokeStyle = "#ffffff", 
		ctx.lineWidth = 3, 
		ctx.stroke( );
		integrate( t ) >= integralThreshold && ( ctx.lineTo( t * scaleX, canvasHeight ), 
		ctx.lineTo( 0, canvasHeight ), ctx.fillStyle = "rgba(255, 255, 255, 0.5)", 
		ctx.fill( ) );
		const e = t, 
		n = calculateY( e );
		ctx.save( ), 
		ctx.translate( e * scaleX, canvasHeight - n * scaleY ), 
		ctx.rotate( progress * -Math.PI / 0 ), 
		ctx.drawImage( image, -imageWidth / 4.5, -imageHeight / 1.1, imageWidth, imageHeight ), 
		ctx.restore( );
		const a = `${formatProgress(progress)}x`;

		// ctx.fillStyle = "#ffffff", ctx.font = "bold 70px CustomFont", 
		// ctx.fillText( a, canvasWidth / 2.3, canvasHeight / 2.3 ), 
		animationRequestId = requestAnimationFrame( animate )
	} else animationRequestId && cancelAnimationFrame( animationRequestId ), 
	
	setTimeout( ( ( ) => {
		modal.classList.add( "opacity" )
	} ), 1500 )
}

function startAnimation ( ) {
	gameCount++, animationRequestId = requestAnimationFrame( animate ), 
	startBtn.disabled = !0,
	modal.classList.add( "active" )
}

function updateMoneyNum ( ) {
	moneyNum.innerHTML = num + modificateValue, updateMinusBtnState( )
}

function updateMinusBtnState ( ) {
	minusBtn.disabled = modificateValue <= 0
}

function adaptationElements ( ) {
	const t = window.innerWidth / window.innerHeight
		, e = t >= 2 ? "modificate1" : t >= 1.5 ? "modificate2" : t > 1 ? "modificate3" : "modificate4";
	container.className = `container ${e}`, modal.className = `modal ${e}`, updateMoneyNum( )
}

function updateBetting ( t ) {
	selectedBetting = parseFloat( t ), modificateValue = selectedBetting, updateMoneyNum( )
}

function plus ( ) {
	modificateValue += .5, updateMoneyNum( )
}

function minus ( ) {
	modificateValue > 0 && ( modificateValue -= .5, updateMoneyNum( ) )
}

adaptationElements( ), 

window.addEventListener( "resize", adaptationElements ), 
langBtn.addEventListener( "click", ( ( ) => {
	langList.classList.toggle( "active" ), 
	threeangle.classList.toggle( "active" )
} ) ), 

listElems.forEach( ( t => {
	t.addEventListener( "click", ( t => {
		const e = t.target.textContent;

		langBtnText.innerHTML = e, "hi" === e ? ( modalText1.innerHTML = "स्वागत बोनस", modalText2.innerHTML = "पहली तीन जमाओं पर 375% प्राप्त करें", modalText3.innerHTML = "₹36,000 तक", modalBtn.innerHTML = "अभी पकड़ो", text.innerHTML = "एविएटर पायलट से अपना बोनस प्राप्त करें", startBtn.innerHTML = "बोनस प्राप्त करें" ) : ( modalText1.innerHTML = "Welcome Bonus", modalText2.innerHTML = "Get 375% on first 3 deposits", modalText3.innerHTML = "Up to ₹36,000", modalBtn.innerHTML = "Grab now", text.innerHTML = "GET YOUR BONUS FROM AVIATOR PILOT", startBtn.innerHTML = "GET BONUS" ), 
		langList.classList.remove( "active" ), 
		threeangle.classList.remove( "active" )
	} ) )
} ) ), 
betting.forEach( ( t => {
	t.addEventListener( "click", ( t => {
		updateBetting( t.target.textContent )
	} ) )
} ) ), 
startBtn.addEventListener( "click", startAnimation ), 
plusBtn.addEventListener( "click", plus ), 
minusBtn.addEventListener( "click", minus );
