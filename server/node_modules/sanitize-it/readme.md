Sanitize-It:  
These methods are used clean up user or client side values so that they are
handled correctly by server side javascript. 

For example:  
Client side javascript may send a string value of "undefined" when really 
it wanted to send the value undefined.  Using the sanitize string method 
we can detect this and set the value to the appropriate undefined value.