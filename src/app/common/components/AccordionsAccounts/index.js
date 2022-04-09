import React , {useRef , useEffect} from 'react'
import './index.scss'
import { FilterNone } from '@material-ui/icons';

export default function Index({ accountName, data }) {


    let AcoordinRef = useRef()

    const handelClick = () => {
        let elem = AcoordinRef.current;

        elem.classList.toggle("active")
        let panel = elem.nextElementSibling;


        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
            panel.style.paddingBottom = null;

        } else {
            panel.style.maxHeight = panel.scrollHeight + 10 + "px";
            panel.style.paddingBottom = 10 + "px";
        }

    }

    useEffect(() => {
        let elem = AcoordinRef.current;
        let panel = elem.nextElementSibling;
        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
            panel.style.paddingBottom = null;
        } 
    }, [data])

    return (
        <div className={'crad_Accordion'}>
            <button className="accordion_accounts" ref={AcoordinRef} onClick={()=>handelClick()}>
                <div>
                    {accountName}
                </div>
                <div>
                    <svg className={'icon'}>
                        <use xlinkHref='/sprite.svg#arrow-down'></use>
                    </svg>
                </div>
            </button>
            <div className="panel_accounts d-flex justify-content-center align-self-center flex-wrap ">
                {
                    JSON.parse(data.body.content)
                        .filter(item => item.Group === accountName)
                        .map((item, index) => {
                            return (
                                <CardAccounts key={index} data={item} />
                            )
                        })
                }
            </div>
        </div>
    )
}


function CardAccounts({ data }) {


    const accountRef = React.useRef();
    const shebaRef = React.useRef();

    const handleCopyLink = (elem) => {
        var copyText = elem.current

        /* Select the text field */
        copyText.select();
        copyText.setSelectionRange(0, 99999); /* For mobile devices */

        /* Copy the text inside the text field */
        document.execCommand("copy");

        /* Alert the copied text */
        // alert("Copied the text: " + copyText.value);
    }




    return (
        <div className={'CardAccounts p-4 m-5 shadow text-center rounded '}>
            <div className={'mt-5 mb-5'} >
                <h3>{data.Bank}</h3>
            </div>
            <div className={'mt-5 mb-5'}>
                <p>
                    <span>شماره حساب</span>
                    <span className={'ml-2'}><FilterNone  onClick={()=>handleCopyLink(accountRef)} /> </span>
                </p>
                <input className={'input'} value= {data.Number} type={'text'} ref={accountRef} onChange={()=>{ return null}}/>
            </div>
            <div className={'mt-5 mb-5'}>
                <p>
                    <span>شبا</span>
                    <span className={'ml-2'}><FilterNone onClick={()=>handleCopyLink(shebaRef)} /> </span>
                </p>
                <input className={'input'} value= {data.Sheba} type={'text'} ref={shebaRef} onChange={()=>{ return null}} />
            </div>
        </div>
    )
}