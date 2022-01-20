import React from 'react';
import PostCard from "./PostCard"
import styled from "styled-components";
import DatePicker from 'react-date-picker';

const axios = require('axios');

const DateContainer = styled.div`
   background-color: white;
   border-radius: 10px;
   width: 50%;
   margin-left: 25%;
   position: relative;
`;

class Page extends React.Component {

    state = {
        fromDate: new Date(),
        lastFormatedDate: new Date(),
        data: null
    }

    formateDate = (date) => {

        let formatedDate = date.toISOString().split('T')[0]

        let current = date
        let followingTwoDays = new Date(current.getTime() + 172800000).toLocaleDateString().split("/")
        let nextTwoDaysDate = `${followingTwoDays[2]}-${followingTwoDays[1]}-${followingTwoDays[0]}`

        this.setState({ lastFormatedDate: formatedDate, fromDate: date }, () => {
            axios.get(`https://api.nasa.gov/planetary/apod?api_key=HCNJlv1NpUkMhXdycaSVluE5RHY4GQcYwdz5GU5E&start_date=${formatedDate}&end_date=${nextTwoDaysDate}`).then(response => {
                this.setState({ data: response.data })
            }).catch(function (error) {
                console.log(error);
            })
        })

    }

    componentDidMount() {
        var d = new Date(),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        let formatedDate = [year, month, day].join('-');
        axios.get(`https://api.nasa.gov/planetary/apod?api_key=HCNJlv1NpUkMhXdycaSVluE5RHY4GQcYwdz5GU5E&start_date=${formatedDate}`).then(response => {
            this.setState({ data: response.data })
        }).catch(function (error) {
            console.log(error);
        })
    }
    getCards = () => {
        let allCards = []
        if (this.state.data.length === 0) {
            allCards.push(
                <PostCard
                    title="there is no post now"
                    date="Null"
                    explanation="Nothing!!-- Try after a while ;)"
                    url=""
                    key={0}
                />
            )
        }
        else if (this.state.data.length === 1) {
            allCards.push(
                <PostCard
                    title={this.state.data[0].title}
                    date={this.state.data[0].date}
                    explanation={this.state.data[0].explanation}
                    url={this.state.data[0].url}
                    key={0}
                />
            )
        } else if (this.state.data.length === 2) {
            for (let i = 0; i < 2; i++) {
                allCards.push(
                    <PostCard
                        title={this.state.data[i].title}
                        date={this.state.data[i].date}
                        explanation={this.state.data[i].explanation}
                        url={this.state.data[i].url}
                        key={i}
                    />
                )
            }
        } else {
            for (let i = 0; i <= 2; i++) {
                allCards.push(
                    <PostCard
                        title={this.state.data[i].title}
                        date={this.state.data[i].date}
                        explanation={this.state.data[i].explanation}
                        url={this.state.data[i].url}
                        key={i}
                    />
                )
            }
        }
        return allCards
    }
    render() {
        return (
            <div>
                {this.state.data === null ? console.log("") :
                    < div >
                        <DateContainer>
                            From
                            <DatePicker
                                onChange={(date) => {
                                    this.formateDate(date)
                                }}
                                value={this.state.fromDate}
                            />
                            Up To Three Days
                        </DateContainer>
                        {this.getCards()}
                    </div>
                }

            </div >
        )
    }


}

export default Page;
