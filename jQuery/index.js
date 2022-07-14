// console.log("connected")
// $(document).ready(function(){
// 	$("h1").css("color","blue")

// })


// $("button").forEach(element => {
// 	console.log(element)
// });
// console.log(.map())
// console.log(.map)

// $("h1").css("color")

console.log("starting")
$("h1").css("font-size","5rem")

console.log($("h1").click(function () {
	$("h1").css("color","blue")
}))

$("button").text("falth")

console.log($("img").attr("src"))

$(document).keypress((e)=>{
	// console.log(e.key)
	$("h1").text(e.key)
})

// $("button").remove()

$("h1").before("<button>before</button>")
$("h1").after("<button>after</button>")
$("h1").prepend("<button>prepend</button>")
$("h1").append("<button>append</button>")

$("button").on("click",function () {
	$("h1").slideUp().slideDown()
})


console.log("end")








