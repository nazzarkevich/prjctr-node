const checkParentheses = (str) => {
   const stack = [];
   const parentheses = {
     '(': ')',
     '{': '}',
     '[': ']'
   };

   const hasClosingParentheses = (char) => Object.values(parentheses).includes(char);

   for (let char of str) {
     if (parentheses[char]) {
       stack.push(char);
     }

     if (stack.length && hasClosingParentheses(char)) {
        const lastEl = stack.pop();
       
       if (parentheses[lastEl] !== char) {
         return false;
       }
     }
   }

   return !stack.length;
}