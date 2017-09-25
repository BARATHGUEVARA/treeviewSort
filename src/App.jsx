import React from 'react';
import {connect} from 'react-redux'
import {newTree, resetTree} from './redux/action.js'

let resultArr = [];
class App extends React.Component {
    constructor(props) {
        super(props);
        this.reset = this
            .reset
            .bind(this);
        this.searchTree = this
            .searchTree
            .bind(this);
        this.searchmethod = this
            .searchmethod
            .bind(this);
        this.changeSearchValue = this
            .changeSearchValue
            .bind(this);
        this.state = {
            searchValue: ""
        };
    }
    componentWillReceiveProps(nextProps) {
        //    console.log("nextProps",nextProps)
    }
    makeTreeView(data) {
        //    console.log("maketree",data);
        return (
            <li>{data.node.description} {data
                    .node
                    .children
                    .map((childrenData, subIndex) => {
                        return (
                            <ul key={subIndex}>{this.makeTreeView(childrenData)}</ul>
                        )
                    })}

            </li>
        )
    }
    reset() {
        this
            .props
            .dispatch(resetTree());
    }
    searchTree() {
        let searchStr = this.state.searchValue;
        if (searchStr.charAt(searchStr.length - 1) == '*') {
            searchStr = searchStr.substr(0, searchStr.length - 1);
        }
        if (searchStr.trim().length < 1) {
            alert("Please provide any value to perform search");
        } else {
            resultArr = [];
            let unReferncedProps = JSON.parse(JSON.stringify(this.props));
            this.searchmethod(searchStr, unReferncedProps.treeValue, resultArr);
            this
                .props
                .dispatch(newTree(resultArr));
            //   console.log(resultArr,"resultArr");
        }
    }
    searchmethod(searchString, dataTree, resultArr) {

        for (let i = 0; i < dataTree.length; i++) {
            if (dataTree[i].node.description.toLowerCase().includes(searchString)) {
                let index = resultArr.push(dataTree[i]) - 1;
            } else {
                this.searchmethod(searchString, dataTree[i].node.children, resultArr)
            }
        }
    }
    changeSearchValue(e) {
        this.setState({searchValue: e.target.value});
    }
    render() {
        return (
            <div className="mainWrapper">
                <div className="searchFieldRow">
                    <input
                        type="search"
                        name="searchData"
                        value={this.state.searchValue}
                        onChange={this.changeSearchValue}/>
                    <input type="button" name="Search" value="Search" onClick={this.searchTree}/>
                    <input type="button" name="Clear" value="Reset" onClick={this.reset}/>
                </div>
                <div className="treeViewWrapper">
                    {this
                        .props
                        .treeValue
                        .map((rootData, index) => {
                            return (
                                <ul key={index}>{this.makeTreeView(rootData)}</ul>
                            )
                        })}
                </div>
            </div>
        );
    }
}

function mapStatetoProps(store) {
    // console.log(store)
    return {treeValue: store.tree};
}
export default connect(mapStatetoProps)(App);