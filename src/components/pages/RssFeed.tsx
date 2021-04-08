import React, { FC, FormEvent, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Message from "../UI/Message";
import { setSuccess, submitGemForm } from "../../store/actions/authActions";
import { RootState } from "../../store";
import { Form, Table } from "react-bootstrap";
import Button from "../UI/Button";
import Parser from "rss-parser";
import fs from "fs";

const RssFeed: FC = (data) => {
  const { success } = useSelector((state: RootState) => state.auth);

  const [rssFeed, setRssFeed] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (success) {
      dispatch(setSuccess(""));
    }
  }, [success, dispatch]);

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    dispatch(submitGemForm({ rssFeed }, () => setLoading(false)));
  };

  return (
    <section className="container">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th className="needToBeTrimmed">Needs to be trimmed</th>
            <th className="readyToUpload">Ready to upload</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Mark</td>
            <td>Otto</td>
          </tr>
          <tr>
            <td>Jacob</td>
            <td>Thornton</td>
          </tr>
        </tbody>
      </Table>
    </section>
  );
};

export default RssFeed;
