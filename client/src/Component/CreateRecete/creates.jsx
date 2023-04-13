import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {postRecipe, getDiet} from '../../redux/Action';
import './creates.css'

function validateInput(input){
    let errors = {};
    if(!input.name){
        errors.name = "Recipe name is required";
    } else if(!input.summary){
        errors.summary = "Recipe summary required";
    } else if(!input.healthscore || input.healthscore < 1 || input.healthscore > 100){
        errors.healthscore = "Health Score required, values must be between 1 and 100";
    } else if(!input.image){
        errors.image = "Image required";
    }else if(!input.steps){
        errors.steps = "Recipe steps required";
    }else if(!input.diets || input.diets.length === 0){
        errors.diets = "Diet type required";
    }
    return errors;
}

export default function RecipeCreate(){

    const dispatch = useDispatch();
    const history = useHistory();
    const diets = useSelector( state => state.diet);
    const [errors, setErrors] = useState({});
    const [input, setInput] = useState({
        name: "",
        image: "",
        summary: "",
        healthscore: "",
        steps: "",
        diets: []
    });

    useEffect(()=>{
        dispatch(getDiet());
    },[dispatch])

    function handleChange(e){
        e.preventDefault();
        setInput({
            ...input,
            [e.target.name]: e.target.value 
        })
        setErrors(validateInput({
            ...input,
            [e.target.name]: e.target.value
        }))
    }

    function handleCheck(e){
        const value = e.target.value;
        const checked = e.target.checked;
      
        let newDiets;
        if (checked) {
          newDiets = [...input.diets, value];
        } else {
          newDiets = input.diets.filter((diet) => diet !== value);
        }
      
        setInput({
          ...input,
          diets: newDiets,
        });
      };

    function handleSubmit(e){

        e.preventDefault();
        if(Object.keys(errors).length < 1){
            console.log(input);
            dispatch(postRecipe(input));
            alert("Recipe created");
            setInput({
                name: "",
                image: "",
                summary: "",
                healthscore: "",
                steps: "",
                diets: []
            });
        }else{
            alert("There must be no errors in order to create the recipe")
        }
        history.push("/home");
    }

    // function handleDelete(e){
    //     setInput({
    //         ...input,
    //         diets: input.diets.filter( diet => diet !== e)
    //     })
    // }

    return (
        <div className='cont'>
            
            <form onSubmit={e=>handleSubmit(e)} className="form-input">
            <h1>Create your new recipe</h1>
            <div  className='name'>
  <label>Name: </label>
  <input type="text" value={input.name} name="name" placeholder="Enter the name of the recipe" onChange={handleChange} />
  {errors.name && <p className='error'>{errors.name}</p>}
</div>
<div>
  <label>Image: </label>
  <input type="text" value={input.image} name="image" placeholder="Enter the url of the image" onChange={handleChange} />
  {errors.image && <p className='error'>{errors.image}</p>}
</div>
<div>
<div className='dietTypes'>
  <label>Diet Type: </label>
  {diets && diets.map((e, index) => {
    return (
      <label key={index}>
        {e.name}
        <input type="checkbox" className='checkbox' value={e.name} onChange={handleCheck} />
      </label>
    )
  })}
  <div>
  <label>Summary: </label>
  <textarea name="summary" placeholder="Enter a summary for the recipe" rows="5" cols="40" onChange={handleChange}></textarea>
  {errors.summary && <p className='error'>{errors.summary}</p>}
</div>
<div>
  <label>Health Score: </label>
  <input type="number" value={input.healthscore} name="healthscore" placeholder="Enter the health score from 1 to 100" onChange={handleChange} />
  {errors.healthscore && <p className='error'>{errors.healthscore}</p>}
</div>
<div>
  <label>Steps: </label>
  <input type="text" value={input.steps} name="steps" placeholder="Enter the steps..." onChange={handleChange} />
  {errors.steps && <p className='error'>{errors.steps}</p>}
</div>
    {/* {errors.diets && <p className='error'>{errors.diets}</p>}
    <ul>
      <li>
        {<p>Added:</p>}{input.diets.map((e, index)=> <div className='const-diet' key={index}>{e + ", "}</div>)}
      </li>
    </ul> */}
  </div>
</div>
{/* <div className='delete'>
  {input.diets.map((e, index)=>{
      return (
          <div key={index}>
        <button className='error' onClick={()=>handleDelete(e)}> x</button>
      </div>
    )
})}
</div> */}
<div className='buttonForm'>
<button disabled={Object.keys(errors).length > 0 || input.name === ''} type="submit">Create Recipe</button>
<Link to="/home"><button>Go back home</button></Link>
</div>
            </form>
        </div>
    );

}