import React from "react";
import styled from "styled-components";

const MainContainer = styled.div`
  position: relative;
  width: fit-content;
  margin: 15px;
  float: left;
  height: 850px;
  width: 570px;
  border-radius: 10px;
  background-color: white;
  margin-left: 23px;
`;

const PostPic = styled.img`
  height: 300px;
  box-shadow: 0 2px 5px #000;
  width: 100%;
  border-radius: 7px;
  object-fit: cover;
`;
const PostTitle = styled.div`
    margin: 10px;
    font-family: Serif;
    width: 100%;
    font-size: 25px;
    font-weight: 700;
    text-align: left;
`;
const PostExplanation = styled.div`
    margin: 10px;
    font-family: Arial;
    width: 97%;
    font-size: 20px;
    text-align: left;
    height: 400px;
    overflow-y: scroll;
`;
const LikeButton = styled.button`
    background-color: green;
    color: white;
    font-size: 25px;
`;

class PostCard extends React.Component {
    render() {
        return (
            <MainContainer >
                <PostPic
                    src={this.props.url}
                />
                <PostTitle>
                    {this.props.titles}
                    <div style={{
                        fontSize: "20px",
                        fontWeight: "0",
                        fontFamily: "Monospace",
                        marginTop: "5px",
                        color: "rgb(57, 24, 247)"
                    }}>
                        {this.props.date}
                    </div>
                </PostTitle>
                <PostExplanation>
                    {this.props.explanation}
                </PostExplanation>

                {/* I was going to make an object in the local storage to add the liked posts or pictures for that user and 
                    once the user reloads the page, I will look in the object if any of the three posts in the scereen is liked by 
                    the user.
                */}
                <LikeButton >
                    Like
                </LikeButton>
            </MainContainer>
        );
    }
}

export default PostCard;
