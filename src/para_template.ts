const template = [
  {
    content: `This is a page to gather all your Projects, Areas, Resources and Archive together.`,
    children: [
      {
        content: `To list all your Projects, we use any page that has its \`page-type\` set to \`project\`, or any page that is being linked to using \`project::\`. The same goes for Areas and Resources.`,
      },
      {
        content: `Archive is any page that has \`archived\` set to \`true\`.`,
        children: [{ content: "This functionality is not implemented yet" }],
      },
    ],
  },
  {
    content: `## Projects`,
    children: [
      {
        content: `
#+BEGIN_QUERY
{
  :query [:find (pull ?page [*])
         :where
         (or-join [?page]
                  (and [_ :block/properties ?prop]
                       [(get ?prop :project) ?page1]
                       [(str ?page1) ?page11]
                       [_ :block/refs ?page]

                       [?page :block/original-name ?page2]
                       [(str "#{\\"" ?page2 "\\"}") ?page22]

                       [(= ?page22 ?page11)]
                       )
                  (and
                    [?page :block/name]
                    [?page :block/properties ?prop3]
                    [?page :block/original-name ?page3-name]
                    [(get ?prop3 :page-type) ?v]
                    (or [(= ?v "project")] [(contains? ?v "project")])
                    )
                  )
         ]
 :view (fn [result]
          [:div.flex.flex-col
          (for [page result]
            [:a {:href (str "#/page/" (get page :block/original-name))} (get page :block/original-name) ]
            )
         [:hr]
          ]
         )
}
#+END_QUERY`,
      },
    ],
  },
  {
    content: `## Areas`,
    children: [
      {
        content: `#+BEGIN_QUERY
{
 :query [:find (pull ?page [*])
         :where
         (or-join [?page]
                  (and [_ :block/properties ?prop]
                       [(get ?prop :area) ?page1]
                       [(str ?page1) ?page11]

                       [_ :block/refs ?page]
                       [?page :block/original-name ?page2]
                       [(str "#{\\"" ?page2 "\\"}") ?page22]

                       [(= ?page22 ?page11)]
                       )
                  (and
                    [?page :block/name]
                    [?page :block/properties ?prop3]
                    [?page :block/original-name ?page3-name]
                    [(get ?prop3 :page-type) ?v]
                    (or [(= ?v "area")] [(contains? ?v "area")])
                    )
                  )
         ]
 :view (fn [result]
          [:div.flex.flex-col
          (for [page result]
            [:a {:href (str "#/page/" (get page :block/original-name))} (get page :block/original-name) ]
            )
         [:hr]
          ]
         )
 }
#+END_QUERY`,
      },
    ],
  },
  {
    content: `## Resources`,
    children: [
      {
        content: `#+BEGIN_QUERY
{
 :query [:find (pull ?page [*])
         :where
         (or-join [?page]
                  (and [_ :block/properties ?prop]
                       [(get ?prop :resource) ?page1]
                       [(str ?page1) ?page11]

                       [_ :block/refs ?page]
                       [?page :block/original-name ?page2]
                       [(str "#{\\"" ?page2 "\\"}") ?page22]

                       [(= ?page22 ?page11)]
                       )
                  (and
                    [?page :block/name]
                    [?page :block/properties ?prop3]
                    [?page :block/original-name ?page3-name]
                    [(get ?prop3 :page-type) ?v]
                    (or [(= ?v "resource")] [(contains? ?v "resource")])
                    )
                  )
         ]
 :view (fn [result]
          [:div.flex.flex-col
          (for [page result]
            [:a {:href (str "#/page/" (get page :block/original-name))} (get page :block/original-name) ]
            )
         [:hr]
          ]
         )
 }
#+END_QUERY`,
      },
    ],
  },
];
export default template;
