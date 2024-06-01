document.addEventListener('DOMContentLoaded', function() {
    const textElement = document.getElementById('text');
    const tooltip = document.getElementById('tooltip');

    textElement.addEventListener('click', function(event) {
        const sentence = getSentenceUnderCursor(event);
        console.log('Clicked sentence:', sentence);  // Debugging line
        if (sentence) {
            fetch(`/translate?sentence=${encodeURIComponent(sentence)}`)
                .then(response => response.json())
                .then(data => {
                    console.log('Translation:', data.translation);  // Debugging line
                    console.log('Explanation:', data.explanation);  // Debugging line
                    showTooltip(event, formatTooltipText(data.translation, data.explanation));
                })
                .catch(error => {
                    console.error('Error fetching translation:', error);
                });
        }
    });

    function getSentenceUnderCursor(event) {
        const range = document.caretRangeFromPoint(event.clientX, event.clientY);
        if (range) {
            const textNode = range.startContainer;
            if (textNode.nodeType === Node.TEXT_NODE) {
                const textContent = textNode.textContent;
                const offset = range.startOffset;

                // Find the start and end of the sentence at the offset
                let start = offset;
                while (start > 0 && !/[.!?]/.test(textContent[start - 1])) {
                    start--;
                }

                let end = offset;
                while (end < textContent.length && !/[.!?]/.test(textContent[end])) {
                    end++;
                }

                // Include the sentence-ending punctuation
                if (end < textContent.length) {
                    end++;
                }

                return textContent.substring(start, end).trim();
            }
        }
        return null;
    }

    function formatTooltipText(translation, explanation) {
        return `<strong>Орчуулга:</strong><br>${breakTextIntoLines(translation, 60)}<br><br><strong>Тайлбар:</strong><br>${breakTextIntoLines(explanation, 60)}`;
    }

    function breakTextIntoLines(text, maxLength) {
        const regex = new RegExp(`(.{1,${maxLength}})(\\s|$)`, 'g');
        return text.match(regex).join('<br>');
    }

    function showTooltip(event, content) {
        tooltip.innerHTML = content;
        const tooltipRect = tooltip.getBoundingClientRect();
        const textRect = textElement.getBoundingClientRect();
        const spaceAbove = event.clientY;
        const spaceBelow = window.innerHeight - event.clientY;

        // Ensure the tooltip stays within the text container
        let top = 0;
        if (spaceBelow > tooltipRect.height + 10) {
            top = event.pageY + 10;
        } else {
            top = event.pageY - tooltipRect.height - 10;
        }
        let left = event.pageX - tooltipRect.width / 2;
        if (left < textRect.left) {
            left = textRect.left;
        } else if (left + tooltipRect.width > textRect.right) {
            left = textRect.right - tooltipRect.width;
        }

        tooltip.style.top = `${top}px`;
        tooltip.style.left = `${left}px`;
        tooltip.style.opacity = 1;
        tooltip.style.visibility = 'visible';
    }

    document.addEventListener('click', function(event) {
        if (!textElement.contains(event.target)) {
            tooltip.style.opacity = 0;
            tooltip.style.visibility = 'hidden';
        }
    });
});
