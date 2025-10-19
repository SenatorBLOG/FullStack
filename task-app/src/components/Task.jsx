
const images = import.meta.glob("../assets/images/*.{jpg,png,svg}", {eager: true});
const Task = ({taskObj,onDelete,onSetPriority}) => {
    const {id, text, priority,img} = taskObj;
    const imageList= Object.values(images).map((img) => img.default);
    console.log(imageList)
    let source = imageList.find(str=>str.includes(img))
    return (<>
       <div style={{border:'1px solid #000',padding:20,margin:20}}>
         <h4>{text}</h4>
        <img src={source}  width={200} height={200}/>
        <img style={{height:"200px", backgroundColor:"#000"}}/><br/>
        <button onClick={()=>onDelete(id)} style={{backgroundColor: "#62AAFB",marging:10}}>Delete</button><br/>
            <select 
            name="priority"
            // Связываем select с текущим значением приоритета
            value={priority} 
            style={{backgroundColor: 'lightblue',padding:10,margin:10,width:220}}
            onChange={(e) => onSetPriority(id, e.target.value)}
        >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>

            </select>
       </div>
    </>  );
}
 
export default Task;
