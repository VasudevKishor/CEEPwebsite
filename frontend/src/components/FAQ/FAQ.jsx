import React, { useState, useEffect } from "react";
import "./FAQ.css";

const FAQ = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  // Optional: Scroll reveal for FAQ
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );

    const faqSection = document.querySelector('.faq-section');
    if (faqSection) observer.observe(faqSection);

    return () => {
      if (faqSection) observer.unobserve(faqSection);
    };
  }, []);

  const faqData = [
    {
      question: "What type of organizations do you work with?",
      answer: "We support manufacturing facilities, commercial buildings, institutions, and infrastructure operators seeking structured improvements in operational performance and resource management."
    },
    {
      question: "How do your engagements typically begin?",
      answer: "Engagements usually start with a diagnostic assessment to understand system performance, operational constraints, and financial priorities. From there, we define a structured improvement roadmap."
    },
    {
      question: "Do you focus only on energy reduction?",
      answer: "No. Our work considers financial outcomes, operational reliability, regulatory alignment, and occupant or process requirements. Energy performance is evaluated within the broader business context."
    },
    {
      question: "Will recommended measures disrupt ongoing operations?",
      answer: "Our approach prioritizes practical implementation. Recommendations are phased and aligned with operational continuity to minimize disruption."
    },
    {
      question: "How are results measured?",
      answer: "Outcomes are tracked through defined performance indicators such as consumption patterns, operational metrics, financial impact, and system stability."
    },
    {
      question: "Do you provide implementation support?",
      answer: "Yes. We support both advisory-level guidance and hands-on coordination during execution, depending on client requirements."
    },
    {
      question: "Can you assist with compliance and sustainability reporting?",
      answer: "We help align technical improvements with relevant regulatory and reporting frameworks to support governance and disclosure requirements."
    },
    {
      question: "What is the average period for the Return on Investment?",
      answer: "Most measures have a ROI of 12-14 months. Some measures can be longer but provide huge savings in the long run."
    }
  ];

  return (
    <section className="faq-section" data-scroll-reveal>
      <div className="section-container">
        <h2 className="section-title" data-heading-animate>Frequently Asked Questions</h2>
        <div className="faq-list">
          {faqData.map((item, index) => (
            <div 
              key={index} 
              className={`faq-item ${openFaqIndex === index ? 'active' : ''}`} 
              onClick={() => toggleFaq(index)}
            >
              <div className="faq-question-wrapper">
                <h4 className="faq-question">{item.question}</h4>
                <span className="faq-toggle">{openFaqIndex === index ? '−' : '+'}</span>
              </div>
              <div className="faq-answer-wrapper">
                <p className="faq-answer">{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
