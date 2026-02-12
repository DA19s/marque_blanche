import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"

export default function SupportPage() {
  const faqs = [
    {
      question: "Comment m'inscrire à un module ?",
      answer: "Pour vous inscrire à un module, cliquez sur le module qui vous intéresse dans le catalogue, puis cliquez sur le bouton 'S'inscrire au module'. Vous pourrez ensuite accéder à tout le contenu.",
    },
    {
      question: "Comment suivre ma progression ?",
      answer: "Votre progression est visible dans votre tableau de bord. Vous pouvez voir quels modules vous avez complétés et votre progression pour chaque module en cours.",
    },
    {
      question: "Que faire si j'échoue au quiz ?",
      answer: "Si vous n'obtenez pas le score de passage, vous pouvez repasser le quiz. Continuez à réviser le contenu du module et réessayez.",
    },
    {
      question: "Comment obtenir un certificat ?",
      answer: "Les certificats sont délivrés automatiquement après avoir complété un module et réussi le quiz associé avec un score supérieur au score de passage.",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4">
            Support & FAQ
          </h1>
          <p className="text-gray-600 text-lg">
            Trouvez les réponses à vos questions
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Questions Fréquentes</CardTitle>
            <CardDescription>
              Consultez les réponses aux questions les plus courantes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Besoin d'aide supplémentaire ?</CardTitle>
            <CardDescription>
              Contactez-nous pour toute question
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Si vous ne trouvez pas la réponse à votre question dans la FAQ, n'hésitez pas à nous contacter.
            </p>
            <a href="/contact">
              <Button
                style={{
                  background: `linear-gradient(to right, var(--tenant-primary), var(--tenant-secondary))`
                }}
              >
                Nous contacter
              </Button>
            </a>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
