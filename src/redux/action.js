
export function newTree(data){
  return {
      type : "newTree",
      payload : data
  }
}

export function resetTree(){
    return{
        type : "ResetTree"
    }
}