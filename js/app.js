let app = {
    
    RequestResponseService : function(){
        
        function call( json ){
            
            console.log(json);
            
            let uri = "../request.php";
            
            let headers = new Headers();
            headers.append("Content-Type", "text/xml");
            headers.append("Accept", "application/json; charset=utf-8");
            
            let options = {
                method: "Post",
                mode: "cors",
                headers: headers
            }
            
            let data = new FormData();
            data.append( "data" , JSON.stringify(json));
            
            return fetch(new Request(uri, { method: "Post" , options: options, body: data }))
                .then(function(response){
                    return response.json();
                })
                .catch(function( error ){
                    console.log("ERROR:",error.message);
            });
            
        }
        
        return {
            call : call
        }
    }(),
    
    submit : function( ev ){
        ev.preventDefault();
       
        let data = {
             "Inputs": {

                "input1":[{
                    "age" : Number(document.getElementById("age").value),
                    "job" : document.getElementById("job").value,
                    "marital" : document.getElementById("marital").value,
                    "education" : document.getElementById("education").value,
                    "default" : document.getElementById("default").value,
                    "housing" : document.getElementById("housing").value,
                    "loan" : document.getElementById("loan").value,
                    "contact" : document.getElementById("contact").value,
                    "month" : document.getElementById("month").value,
                    "day_of_week" : document.getElementById("day_of_week").value,
                    "duration" : Number(document.getElementById("duration").value),
                    "campaign" : Number(document.getElementById("campaign").value),
                    "pdays" : Number(document.getElementById("pdays").value),
                    "previous" : Number(document.getElementById("previous").value),
                    "poutcome" : document.getElementById("poutcome").value,
                    "emp_var_rate" : Number(document.getElementById("emp_var_rate").value),
                    "cons_price_idx" : Number(document.getElementById("cons_price_idx").value),
                    "cons_conf_idx" : Number(document.getElementById("cons_conf_idx").value),
                    "euribor3m" : Number(document.getElementById("euribor3m").value),
                    "nr_employed" : Number(document.getElementById("nr_employed").value),
                    "y" : Number(document.getElementById("y").value),
                }]
             },
            "GlobalParameters": {}
        };
        
        app.RequestResponseService.call(data)
        .then(function( jsonData ){
            if(jsonData.error){
                document.querySelector("#result h2").textContent = jsonData.error.message;
            } else {
                document.querySelector("#result h2").textContent = "Scored Labels: " + jsonData.Results.output1[0]["Scored Labels"];
                document.querySelector("#result spam").textContent = JSON.stringify(jsonData);
            }
            
            window.scrollTo(0, 0);
            
            document.getElementById("result").classList.remove("hidden");
            document.getElementById("home").classList.add("hidden");
        });
    },
    
    new : function( ev ){
        ev.preventDefault();
        
        document.getElementById("result").classList.add("hidden");
        document.getElementById("home").classList.remove("hidden");
    },
    
    init : function(){
        document.getElementById("submit").addEventListener("click", app.submit );
        document.getElementById("return").addEventListener("click", app.new );
    }
}
app.init();