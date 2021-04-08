import React, { Component } from "react";

class ReactCrud extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      pass: "",
      empdata:[],
      flag:false,
      index:''
    };
  }
  handler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
    this.showData()
  };
  clickHandler=()=>{
      const{name,pass}=this.state;
      var data=JSON.parse(localStorage.getItem("user"))||[];
      var obj={name,pass};
      data.push(obj);
      this.setState({
          empdata:data
      })
      localStorage.setItem('user',JSON.stringify(data));
     
  }
  showData=()=>{
      console.log("hello")
        const{empdata,name,pass}=this.state;
        return empdata.map((m,i)=>{
         
            return(<div>
    
                    <tr>
                        <td>{m.name}</td>
                        <td>{m.pass}</td>
                   
        
                
                    <td><button className="btn btn-success" onClick={()=>this.editData(i)}>Edit</button></td>
                    <td><button className="btn btn-danger" onClick={()=>this.deleteData(i)}>delete</button></td>
                    </tr>
            </div>)
        })
  }
  editData=(i)=>{
      var data=JSON.parse(localStorage.getItem('user'))||[];
      var old_obj=data[i];
       const {empdata,flag}=this.state;
       this.setState({
           flag:true,
           name:old_obj.name,
           pass:old_obj.pass,
           index:i
       })       
       this.showData()
;  }
  updateData=()=>{
      console.log("update")
      const {name,pass,flag,index}=this.state;
      var data=JSON.parse(localStorage.getItem('user'))||[];
    var obj={name,pass};
    data[index]=obj;
    localStorage.setItem('user',JSON.stringify(data));
    var arr=JSON.parse(localStorage.getItem('user'))||[];
    this.setState({
        empdata:arr
    })
    this.showData();
  }
  deleteData=(i)=>{
    var data=JSON.parse(localStorage.getItem('user'))||[];
    data.splice(i,1);
    localStorage.setItem('user',JSON.stringify(data));
    var da=JSON.parse(localStorage.getItem('user'))||[];
    this.setState({
        empdata:da
    })
    this.showData();
  }
  componentDidMount(){
    var arr = JSON.parse(localStorage.getItem("empData")) || [];

    this.setState({
      empdata: arr,
    });
  }
  render() {
    const { name, pass,flag } = this.state;
    return (
      <div>
        <input className="mt-7 ml-5"
          type="text"
          value={name}
          placeholder="name"
          name="name"
          onChange={this.handler}
        ></input><br></br>
        <input className="mt-3 ml-5"
          type="text"
          value={pass}
          placeholder="password"
          name="pass"
          onChange={this.handler}
        ></input><br></br>
        <button className="mt-4 ml-5" onClick={flag?this.updateData:this.clickHandler}>{flag?'Update':'Submit'}</button>

    <div>
        <table className="table table-border shadow table-striped">
            <tr>
                <thead>
                <th>Name</th>
                <th>Password</th>
                </thead>
            </tr>
            <tbody>
        {this.showData()}
        </tbody>
        </table>
    </div>
      </div>
    );
  }
}

export default ReactCrud;
