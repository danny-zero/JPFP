import React, { Component } from 'react';
import { fetchCampuses } from '../store/campuses';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const mapStateToProps = (state) => {
    return {
        campuses: state.campuses
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadCampuses: () => dispatch(fetchCampuses())
    }
}

class Campuses extends Component {
    componentDidMount() {
        this.props.loadCampuses()
    }

    render() {
        // console.log(this.props)
        const {campuses} = this.props
        return (
            <div className="campuses">
                <h1>Campuses</h1>
                {
                    campuses.map((campus) => {
                        return (
                            <Link to={`/campuses/${campus.id}`} key={campus.id}>
                            <div>
                                <img src={campus.imageUrl} />
                                <p>{campus.name}</p>
                            </div>
                            </Link>
                        )
                    })
                }
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Campuses);
