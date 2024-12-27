import 'globalthis/auto';
import styles from "../mycss.module.css"
export default function Loader(){
    return <>
        <div className={styles.Loader}>
            <div className="d-flex justify-content-center flex-column align-items-center">
                <img src="/help/load2.gif" alt="Loading..." width={100} />
                 <h5 className={styles.textPrimary}>Please Wait...</h5>
            </div>
        </div>
    </>
}