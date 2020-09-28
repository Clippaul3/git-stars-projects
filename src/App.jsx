import React, {Component} from 'react';
import logo from './logo.svg';
import './App.scss';
import axios from 'axios'

import 'font-awesome/less/font-awesome.less';
import 'react-fontawesome';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faUser, faStar, faCopy, faShareSquare, faComment} from '@fortawesome/free-regular-svg-icons'

class App extends Component {

    state = {
        projects: [],
        language: ''
    }

    componentDidMount() {
        this.loadData()
    }

    loadData = () => {
        let {language} = this.state
        axios.get(`https://api.github.com/search/repositories?q=stars:%3E1+language:${language}&sort=stars&order=desc&type=Repositories`)
            .then((res) => {
                console.log(res.data.items)
                this.setState({projects: res.data.items})
            })
    }

    switchLanguage = (language) => {
        this.setState({language}, () => {
            this.loadData()
        })
    }

    render() {
        let {projects, language} = this.state
        return (
            <div className="git-stars">
                <div className={'git-stars-languages'}>
                    <div className={`git-stars-languages-item ${language == '' && 'active'}`}
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
                <div className={'git-stars-body'}>
                    {
                        projects.map((project, index) => (
                            <div key={index} className={'git-stars-item'}>
                                <div className={'git-stars-item-no'}>#{index}</div>
                                <div className={'git-stars-logo'}>
                                    <img className={'git-stars-img'} src={project.owner.avatar_url}/>
                                </div>
                                <div className={'git-stars-name'}>{project.name}</div>
                                <div className={'git-stars-info'}>
                                    <div className={'git-stars-info-name'}>
                                        <FontAwesomeIcon className={'icon'} icon={faUser}/>
                                        {project.name}
                                    </div>
                                    <div className={'git-stars-star-count'}>
                                        <FontAwesomeIcon className={'icon'} icon={faStar}/>
                                        {project.stargazers_count}
                                    </div>
                                    <div className={'git-stars-forks'}>
                                        <FontAwesomeIcon className={'icon'} icon={faShareSquare}/>
                                        {project.forks_count}
                                    </div>
                                    <div className={'git-stars-issues'}>
                                        <FontAwesomeIcon className={'icon'} icon={faComment}/>
                                        {project.open_issues_count}
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        )

    }
}

export default App;
