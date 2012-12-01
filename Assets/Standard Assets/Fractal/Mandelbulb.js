var c1 : Color = Color.yellow;
var c2 : Color = Color.magenta;
var c3 : Color = Color.red;
var c4 : Color = Color.blue;
var c5 : Color = Color.cyan;
var c6 : Color = Color.green;


var lengthOfLineRenderer : int = 30000;
var r = 10.0;
var phi = 28.0;
var theta = 8/3;




var number = new Array ();


var colorarray = new Array();

var selectedCol;

function Start() {
     var lineRenderer : LineRenderer = gameObject.AddComponent(LineRenderer);
     lineRenderer.material = new Material (Shader.Find("Particles/Additive"));
     lineRenderer.SetColors(c1, c1);
     lineRenderer.SetWidth(0.1,0.1);
     lineRenderer.SetVertexCount(lengthOfLineRenderer);
     lineRenderer.useWorldSpace = true;
     
     colorarray.Add(c1);
     colorarray.Add(c2);
     colorarray.Add(c3);
     colorarray.Add(c4);
     colorarray.Add(c5);
     colorarray.Add(c6);
     selectedCol = 0;


}

function Update() {

	var lineRenderer : LineRenderer = GetComponent(LineRenderer);
	
	
	
	lineRenderer.material = new Material (Shader.Find("Particles/Additive"));
	lineRenderer.SetColors(colorarray[Random.Range(0,6)],colorarray[Random.Range(0,6)]);
	

	obtainMandelbulbVectors();
    //obtainLorenzVectors();
	
}
 
function obtainMandelbulbVectors(){

// x = r * n * cos(phi) * cos(theta)
// y = sin(phi) * cos(theta)
// z = -sin(theta)
// r=sqrt(x2+y2+z2)
// θ=n atan2(y,x)
// φ=n sin-1(z/r)
	 	var x0 = 0.0;
		var y0 = 0.0;
		var z0 = 0.0;

		var lineRenderer : LineRenderer = GetComponent(LineRenderer);		
		for(var i : int = 0; i < lengthOfLineRenderer && x0*x0 + y0*y0 + z0*z0 < 2.0; i++) {	    	
	
		   	
			//r = Mathf.Sqrt(Mathf.Pow(x1,2) + Mathf.Pow(y1,2) + Mathf.Pow(z1,2));	 
			var r    = Mathf.Sqrt(x0*x0 + y0*y0 + z0*z0 );   	    	      
			var yang = Mathf.Atan2(Mathf.Sqrt(x0*x0 + y0*y0), z0);
			var zang = Mathf.Atan2(y0 , x0);
			var x1 = r*r * Mathf.Sin(yang * 2 + 0.5 * Mathf.PI) * Mathf.Cos(zang*2 + Mathf.PI);
			var y1 = r*r * Mathf.Sin(yang * 2 + 0.5 * Mathf.PI) * Mathf.Sin(zang*2 + Mathf.PI);
			var z1 = r*r * Mathf.Cos(yang * 2 + 0.5 * Mathf.PI);
			
			var newx = x0 + x1;
			var newy = y0 + y1;
			var newz = z0 + z1;
			
	      			
	        var pos : Vector3 = Vector3(newx, newy, newz);
	        lineRenderer.SetPosition(i, pos);
	        
	        x0 = x1;
	      	y0 = y1;
	      	z0 = z1;
    	}
    

	
	

	return pos;	
}


	
	
/*function dx(x,y, z) {
	return -sigma*(x - y);
}
    
function dy(x,y,z) {
	return -x*z + rho*x - y;
}
    
function dz(x,y,z) {
	return x*y - beta*z;
}
   
     
function obtainLorenzVectors()
{

	var x0 = 0.0;
	var y0 = 20.0;
	var z0 = 25.0;	
	
	
	var lineRenderer : LineRenderer = GetComponent(LineRenderer);
    for(var i : int = 0; i < lengthOfLineRenderer; i++) {
    	
    	
    	var x1 = x0 + dx(x0,y0,z0)*dt;
		var y1 = y0 + dy(x0,y0,z0)*dt;
		var z1 = z0 + dz(x0,y0,z0)*dt;
    	    	      	
      			
        var pos : Vector3 = Vector3(x0, y0, z0);
        lineRenderer.SetPosition(i, pos);
        
        x0 = x1;
      	y0 = y1;
      	z0 = z1;
    }
    

	
	

	return pos;	
}
*/

