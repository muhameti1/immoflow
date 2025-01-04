// src/features/company-profile/components/SocialLinksField.jsx
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const SocialLinksField = ({
  socialLinks,
  isSubmitting,
  onLinkChange,
  onAddLink,
  onRemoveLink,
}) => (
  <div className="space-y-2">
    <Label>Social Links</Label>
    <div className="space-y-4">
      {Array.isArray(socialLinks) &&
        socialLinks.map((link, index) => (
          <div key={index} className="flex gap-2">
            <Input
              value={link}
              onChange={(e) => onLinkChange(index, e.target.value)}
              placeholder="https://example.com"
              disabled={isSubmitting}
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => onRemoveLink(index)}
              disabled={isSubmitting}
            >
              Remove
            </Button>
          </div>
        ))}
      <Button
        type="button"
        variant="outline"
        onClick={onAddLink}
        disabled={isSubmitting}
      >
        Add Social Link
      </Button>
    </div>
  </div>
);

export default SocialLinksField;
