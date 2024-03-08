# hrtzc

hrtzc is a simple webpage to quickly compare different _heart rate training zones_ models.

- experiment with mobile-first page design
- modern web dev tooling instead of dropping a couple of CDN `script` tags

## Usage

The page is available [here](https://tlgs.github.io/hrtzc/).
It's built and deployed using GitHub Actions and makes use of GitHub Pages.

## Development

Some useful one-liners are available as package scripts; run `npm run` to see a list.

### Tech stack

Built with [Chart.js](https://www.chartjs.org/),
[Bootstrap](https://getbootstrap.com/),
and [Vite](https://vitejs.dev/) + [PurgeCSS](https://purgecss.com/).

Some notes on how I arrived at this combination:

- Popularity -
  I'm not a web developer (and have no interest in becoming one)
  so I chose Bootstrap and Vite because they are popular and look like will be
  around for a while.
  I had an OK time figuring out Bootstrap's _mobile-first approach_,
  and I don't have enough experience with web build tools to tell if Vite was
  the right choice.
- Power and comfort -
  I would have _loved_ to use this project to learn D3: it's a simple stacked
  horizontal bar chart and the dataset recalculation is trivial.
  Still, I felt like I would need to invest a decent chunk of time before I could
  produce something close to what Chart.js offers out-of-the-box.
  I instead chose to experiment with another part of my toolbox.

### Web build tools

Part of this project was bringing in a build tool (Vite) to try
and improve page performance.
A couple of metrics were recorded before and after restructuring the project
using the Lighthouse Firefox plugin on the GitHub Pages deployment:

|            | Payload | FCP (mobile) | FCP (desktop) | TBT (mobile) | TBT (desktop) |
| ---------- | ------- | ------------ | ------------- | ------------ | ------------- |
| before     | 113 KiB | 1.8 s        | 0.6 s         | 170 ms       | 20 ms         |
| Vite       | 73 KiB  | 1.5 s        | 0.5 s         | 50 ms        | 0 ms          |
| + PurgeCSS | 60 KiB  | 1.3 s        | 0.4 s         | 10 ms        | 0 ms          |

However, it turns out there's a lot of _building_ that Vite is not doing --
I achieved an 89% size reduction of the CSS bundle by using PurgeCSS.
