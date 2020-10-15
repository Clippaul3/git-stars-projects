import React, {Component} from 'react';
import './index.scss';
import axios from 'axios'
import {Spin, Alert} from 'antd'
import 'font-awesome/less/font-awesome.less';
import 'react-fontawesome';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faUser, faStar, faCopy, faShareSquare, faComment} from '@fortawesome/free-regular-svg-icons'
import {HashRouter as Router, Route, Redirect, Link, withRouter, Switch} from "react-router-dom";

class LanguageLinnk extends Component {

    state = {
        projects: [],
        language: '',
        page: 1,
        isLoading: true,
        isSwitching: false
    }

    componentDidMount() {

    }

    switchLanguage = (language) => {
        this.setState({language, isSwitching: true}, () => {
            if (language) {
                this.props.history.push({
                    pathname: '/',
                    search: `?language=${language}`
                })
            } else {
                this.props.history.push({
                    pathname: '/'
                })
            }
            window.localStorage.language = language
            this.props.onChange(language)
        })
    }

    render() {
        let {projects, isLoading, isSwitching} = this.state
        // let {language} = window.localStorage
        console.log('行不行',this.props.location.search.split('=')[1]);
        let language = this.props.location.search.split('=')[1]
        return (
            <div className="git-stars" ref={'isReachBottom'}>
                <div className={'git-stars-languages'}>
                    <div className={`git-stars-languages-item ${!language && 'active'}`}
                         onClick={this.switchLanguage.bind(this, '')}>
                        All
                    </div>
                    <div className={`git-stars-languages-item ${language == 'javascript' && 'active'}`}
                         onClick={this.switchLanguage.bind(this, 'javascript')}>
                        javascript
                    </div>
                    <div className={`git-stars-languages-item ${language == 'ruby' && 'active'}`}
                         onClick={this.switchLanguage.bind(this, 'ruby')}>
                        ruby
                    </div>
                    <div className={`git-stars-languages-item ${language == 'java' && 'active'}`}
                         onClick={this.switchLanguage.bind(this, 'java')}>
                        java
                    </div>
                    <div className={`git-stars-languages-item ${language == 'css' && 'active'}`}
                         onClick={this.switchLanguage.bind(this, 'css')}>
                        css
                    </div>
                    <div className={`git-stars-languages-item ${language == 'python' && 'active'}`}
                         onClick={this.switchLanguage.bind(this, 'python')}>
                        python
                    </div>
                </div>
            </div>
        )

    }
}

export default withRouter(LanguageLinnk);
