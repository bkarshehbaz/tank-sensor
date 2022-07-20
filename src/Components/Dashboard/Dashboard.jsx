import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../redux/actions/authActions";
import "./Dashboard.css";

// (1,
// "https://images.unsplash.com/photo-1502570149819-b2260483d302?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
// "Learning numbers 1-10",
// "In this lesson, you’ll be learning the symbols used in counting 1 through 10 in a base-10 number system."),
//   (2,
//   "https://images.pexels.com/photos/7433748/pexels-photo-7433748.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//   "Tally Marks",
//   "Tally charts are represented using a ‘tally cluster’. The tally cluster is a way of arranging tallies into intervals of 5. It is common in most parts of Europe, North America, Australia and New Zealand. To make a tally cluster, you mark up to 4 vertical strokes before using a diagonal stroke to mark the 5th one. By and large, the tally cluster may be the most common tally marker around world."),
//   (3,
//   "https://image.shutterstock.com/z/stock-vector-fraction-number-line-in-mathematics-2036970899.jpg",
//   "Fractions",
//   "Fractions represent parts of a whole — that is, quantities that fall between the whole numbers. Probably the most commonly used fraction is 1/2, which is one-half. For example, if you cut a cake into two pieces and take one for yourself, you get 1/2 of the cake."),
//   (4,
//   "https://image.shutterstock.com/image-vector/algebra-concept-icon-advanced-calculations-600w-1434691847.jpg",
//   "Algebra",
//   "Algebra involves the use of letters in mathematics. These letters are unknowns and can represent either a single unknown number or a range of unknown numbers."),
//   (5,
//   "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1415&q=80",
//   "(Bonus) Chinese Internet slang with numbers",
//   "In this lesson you’ll learn some fun facts about how numbers are using in Chinese internet slang and where they derived from.");

class Dashboard extends Component {
  constructor(props) {
    super(props);
  }
  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { user } = this.props.auth;
    return (
      <section className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="content">
                <div style={{ marginLeft: "10%" }} className="row">
                  <div
                    onClick={() => {
                      this.props.history.push("/Lesson1");
                    }}
                    className="Lesson-Block col-md-4 col-lg-4 col-12"
                  >
                    <img
                      className="Thumbnail"
                      src="https://images.unsplash.com/photo-1502570149819-b2260483d302?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                    />
                    <br />
                    Learning numbers 1-10
                  </div>
                  <div
                    onClick={() => {
                      this.props.history.push("/Lesson2");
                    }}
                    className="Lesson-Block col-md-4 col-lg-4 col-12"
                  >
                    <img
                      className="Thumbnail"
                      src="https://images.pexels.com/photos/7433748/pexels-photo-7433748.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    />
                    <br />
                    Tally Marks
                  </div>
                  <div
                    onClick={() => {
                      this.props.history.push("/Lesson3");
                    }}
                    className="Lesson-Block col-md-4 col-lg-4 col-12"
                  >
                    <img
                      className="Thumbnail"
                      src="https://image.shutterstock.com/z/stock-vector-fraction-number-line-in-mathematics-2036970899.jpg"
                    />
                    <br />
                    Fractions
                  </div>
                  <div
                    onClick={() => {
                      this.props.history.push("/Lesson4");
                    }}
                    className="Lesson-Block col-md-4 col-lg-4 col-12"
                  >
                    <img
                      className="Thumbnail"
                      src="https://image.shutterstock.com/image-vector/algebra-concept-icon-advanced-calculations-600w-1434691847.jpg"
                    />
                    <br />
                    Algebra
                  </div>
                  <div
                    onClick={() => {
                      this.props.history.push("/Lesson5");
                    }}
                    className="Lesson-Block col-md-4 col-lg-4 col-12"
                  >
                    <img
                      className="Thumbnail"
                      src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1415&q=80"
                    />
                    <br />
                    (Bonus) Chinese Internet slang with numbers
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(Dashboard);
