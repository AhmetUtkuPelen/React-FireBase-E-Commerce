import styles from './Contact.module.scss'
import Card from './../../Components/Card/Card';
import { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { toast } from 'react-toastify';


const Contact = () => {

  const form = useRef()

  const SendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_76oqtn9', 'template_yl7oqe5', form.current, {
        publicKey: 'RbP6t-D10-v2WpwjW',
      })
      .then(
        () => {
          toast.success("Message Sent Successfully !")
        },
        (error) => {
          toast.error(error.text)
        },
      );
      e.target.reset()
  };

  return (
    <section className='text-center'>
        <div className={`container ${styles.contact}`}>

          <div className={styles.section}>
            <form onSubmit={SendEmail} ref={form}>
                <Card cardClass={styles.card}>
                  <label>Your Name</label>
                  <input type='text' name='user_name' placeholder='Your Name Please' required/>
                  <label>Your Email</label>
                  <input type='email' name='user_email' placeholder='Your Email Please' required/>
                  <label>Subject</label>
                  <input type='text' name='subject' placeholder='What Is Your Message About ?' required/>
                  <label>Your Message :</label>
                  <textarea name='message' cols="30" rows="10"></textarea>
                  <button className='--btn --btn-primary --btn-block'>SEND</button>
                </Card>
            </form>

          </div>
        </div>
    </section>
  )
}

export default Contact