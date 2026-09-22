function Switch({ setPagina, yzfR6}){
const num = [1,2,3,4];

    return(
        <div className="flex justify-center pb-10 p-1">
        <div className="flex gap-2">
        {yzfR6 && num.map((item, i) => (
            <button key={i} className="bg-yellow-300 hover:bg-yellow-500 rounded-xl w-10 h-10" onClick={() => {setPagina(item)}}>{item}</button>
        )
        )}
       </div>
       </div>
    )
}export default Switch