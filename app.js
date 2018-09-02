function initialize()
{
	// Set values of fields from storage
	if (typeof(Storage) !== 'undefined')
	{
		var savedMealCode = localStorage.getItem('mealCode');
		
		if(savedMealCode !== null)
		{
			setMeal(savedMealCode);
		}
		else
		{
			setMeal('B');
		}
	}
	
	$('#baseline').blur(function(){
		saveBaseline();
	});
	
	$('#ratio').blur(function(){
		saveRatio();
	});
}

function saveBaseline()
{
	if (typeof(Storage) !== 'undefined')
	{
		var savedMealCode = localStorage.getItem('mealCode');
		
		if(savedMealCode !== null)
		{
			switch(savedMealCode)
			{
				case 'B':
					localStorage.setItem('baseline_breakfast',$('#baseline').val());
					break;
				case 'L':
					localStorage.setItem('baseline_lunch',$('#baseline').val());
					break;
				case 'D':
					localStorage.setItem('baseline_dinner',$('#baseline').val());
					break;
				default:
					// TODO: Add logging or error message?
					break;
			}
		}
	}	
}

function saveRatio()
{
	if (typeof(Storage) !== 'undefined')
	{
		var savedMealCode = localStorage.getItem('mealCode');
		
		if(savedMealCode !== null)
		{
			switch(savedMealCode)
			{
				case 'B':
					localStorage.setItem('ratio_breakfast',$('#ratio').val());
					break;
				case 'L':
					localStorage.setItem('ratio_lunch',$('#ratio').val());
					break;
				case 'D':
					localStorage.setItem('ratio_dinner',$('#ratio').val());
					break;
				default:
					// TODO: Add logging or error message?
					break;
			}
		}
	}		
}

function setMeal(mealCode)
{
	//TODO: Need events for buttons and refactor this
	switch(mealCode)
	{
		case 'B':
			$('#baseline').val(localStorage.getItem('baseline_breakfast'));
			$('#ratio').val(localStorage.getItem('ratio_breakfast'));
			$('#title').text('Breakfast');
			localStorage.setItem('mealCode',mealCode);
			break;
		case 'L':
			$('#baseline').val(localStorage.getItem('baseline_lunch'));
			$('#ratio').val(localStorage.getItem('ratio_lunch'));
			$('#title').text('Lunch');
			localStorage.setItem('mealCode',mealCode);
			break;
		case 'D':
			$('#baseline').val(localStorage.getItem('baseline_dinner'));
			$('#ratio').val(localStorage.getItem('ratio_dinner'));
			$('#title').text('Dinner');
			localStorage.setItem('mealCode',mealCode);
			break;
		default:
			// TODO: Add logging or error message?
			break;
	}
	
	$('#bloodsugar').val('');
	$('#mealcarbs').val('');
}

function calculate()
{
	var baselineIinput = parseInt($('#baseline').val(),10);
	var ratioInput = parseInt($('#ratio').val(),10);
	var bloodSugarInput = parseInt($('#bloodsugar').val(),10);
	var carbInput = parseInt($('#mealcarbs').val(),10);
	
	var ratio = 1 / ratioInput;
	
	var bloodUnits = (bloodSugarInput - baselineIinput) / 50;
	
	if(bloodUnits < 0)
	{
		bloodUnits = 0;
	}
	
	var carbUnits = carbInput * ratio;
	
	var totalUnits = Math.round(bloodUnits + carbUnits);
	
	if(isNaN(totalUnits))
	{
		swal('Units: Err!');
	}
	else
	{
		swal('Units: ' + totalUnits);
	}	
}

