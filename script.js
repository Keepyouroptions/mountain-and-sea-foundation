document.getElementById('year').textContent = new Date().getFullYear();

// Mobile nav toggle
const navToggle = document.getElementById('nav-toggle');
const navLinksEl = document.getElementById('nav-links');
if (navToggle && navLinksEl) {
  navToggle.addEventListener('click', function () {
    const isOpen = navLinksEl.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });
  navLinksEl.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      navLinksEl.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Contact form: build a mailto link from the form fields (no backend needed)
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
    const interestField = document.getElementById('interest');
    const interest = interestField ? interestField.value.trim() : '';

    const to = 'hello@mountainandseafoundation.org';
    const mailSubject = encodeURIComponent(subject || `Message from ${name}`);
    const interestLine = interest ? `Interested in: ${interest}\n\n` : '';
    const mailBody = encodeURIComponent(
      `${interestLine}${message}\n\n---\nFrom: ${name}\nEmail: ${email}`
    );

    window.location.href = `mailto:${to}?subject=${mailSubject}&body=${mailBody}`;
  });
}

// Copy-to-clipboard fallback for visitors whose mailto link doesn't open anything
const copyBtn = document.getElementById('copy-email-btn');
if (copyBtn) {
  copyBtn.addEventListener('click', function () {
    const email = document.getElementById('fallback-email').textContent.trim();
    const originalLabel = copyBtn.textContent;

    function showCopied() {
      copyBtn.textContent = 'Copied!';
      setTimeout(function () { copyBtn.textContent = originalLabel; }, 2000);
    }

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(email).then(showCopied).catch(function () {
        fallbackCopy(email, showCopied);
      });
    } else {
      fallbackCopy(email, showCopied);
    }
  });
}

function fallbackCopy(text, onSuccess) {
  const tempInput = document.createElement('textarea');
  tempInput.value = text;
  tempInput.style.position = 'fixed';
  tempInput.style.opacity = '0';
  document.body.appendChild(tempInput);
  tempInput.select();
  try {
    document.execCommand('copy');
    onSuccess();
  } catch (err) {
    // If even this fails, the email is still visible as plain text for manual copying
  }
  document.body.removeChild(tempInput);
}
