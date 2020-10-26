# Read Me #

## Technology used ##
* Utilized React-Router to implement different routes. 
* Choose to use Jest and Enzyme to test React components.
  * Enzyme has built in libraries to easily mount React components, making it easy to update state and rerender the component.
* Refactored components to functional components. In my opinion, it makes the component cleaner with less code, as given access to use hooks which I believe is a clean solution to more reuseable code (in comparison to render props or HOCS).
  
## Notes ##
* created tags into their own component. This allows the component to be reuseable in situations where we want to just display the tag. The use toggle hook wasn't included in the tag component, since we may have instances where we would like to just render the tags. However if there are other situations where we would like to have the toggle tag feature, we would have utilize the toggle hook again, duplicating code.
* My approach to the cache expiration requirement was to cache the unix timestamp + a day forward. By keeping the timestamp as a integer, it's easy to verify if 24 hours have elasped since the expiration. 
