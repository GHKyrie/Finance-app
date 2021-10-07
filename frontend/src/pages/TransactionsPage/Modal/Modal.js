import "./Modal.module.css";
import w from "../../../shared/Wrapper.module.css";
import acl from "../../SharedComponents/AuthButton.module.css";
import {ErrorMessage, Field, Form, Formik} from "formik";
import cl from "../../SharedComponents/AuthForm.module.css";
import fcl from "../../LoginPage/components/LoginField.module.css";
import {Link, useHistory} from "react-router-dom";
import nusercl from "../../LoginPage/components/NewUser.module.css";
import * as React from "react";
import axios from "axios";

const addReq = async values => {
    console.log(values.datetime);

    const data = JSON.stringify({
        "uid": sessionStorage.uid,
        "tag": values.tag,
        "exin": values.exin,
        "amount": values.amount,
        "datetime": values.datetime
    });

    const config = {
        method: 'post',
        url: 'http://localhost:5001/addtransaction',
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };

    const result = await axios(config);

    return result;
}

const validate = values => {
    const errors = {};

    const btn = document.getElementsByClassName(acl.auth)[0];
    btn.innerText = "Добавить транзакцию";

    if (!values.tag) {
        errors.tag = 'Ввод обязателен';
    } else if (values.tag.length > 100) {
        errors.tag = 'Не более 100 символов';
    }

    if (!values.exin) {
        errors.exin = 'Ввод обязателен';
    } else if (values.exin.length > 15) {
        errors.exin = 'Неверный формат';
    }

    if (!values.amount) {
        errors.amount = 'Ввод обязателен';
    } else if (values.amount.length > 10) {
        errors.amount = 'Не более 10 символов';
    }

    if (!values.datetime) {
        errors.datetime = 'Ввод обязателен';
    } else if (values.datetime > 20) {
        errors.datetime = 'Неверный формат';
    }

    return errors;
}

const Modal = (props) => {
    const history = useHistory();

    return (
        <Formik
            initialValues={{login: '', email: '', password: '', confpass: ''}}
            validate={validate}
            onSubmit={async (values, {setSubmitting}) => {
                const btn = document.getElementsByClassName(acl.auth)[0];

                try {
                    const res = await addReq(values);

                    if (res.status == "200")
                    {
                        btn.innerText = "Подождите немного...";
                        setTimeout(() => { history.push("/app") }, 500);
                    }
                } catch (e) {
                    btn.innerText = "Ошибка регистрации";
                }

                setSubmitting(false);
            }}
        >
            <div className={w.wrapper}>
                <Form className={cl.authForm + " " + cl.regForm}>
                    <h2>Новая транзакция</h2>

                    <Field className={fcl.field}
                           name="tag"
                           placeholder="Статья расхода"
                           type="text"
                           autoComplete="off"
                    />
                    <ErrorMessage name="tag"/>

                    <Field className={fcl.field}
                           name="exin"
                           placeholder="Доход/расход"
                           type="text"
                           autoComplete="off"
                    />
                    <ErrorMessage name="exin"/>

                    <Field className={fcl.field}
                           name="amount"
                           placeholder="Сумма"
                           type="number"
                           autoComplete="off"
                    />
                    <ErrorMessage name="amount"/>

                    <Field className={fcl.field}
                           name="datetime"
                           placeholder="Дата"
                           type="datetime-local"
                           autoComplete="off"
                    />
                    <ErrorMessage name="datetime"/>

                    <button className={acl.auth} type="submit">Добавить транзакцию</button>

                    <Link to={"/app"}>
                        <button className={nusercl.new}>Вернуться</button>
                    </Link>
                </Form>
            </div>
        </Formik>
    );
}

export default Modal;