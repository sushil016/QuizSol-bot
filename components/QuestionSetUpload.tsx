"use client"

import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { ImagePlus, X, FileImage } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

export function QuestionUploadSet() {
  const [questionText, setQuestionText] = useState('');
  const [questionImage, setQuestionImage] = useState<File | null>(null);
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [explanation, setExplanation] = useState('');
  const [explanationImage, setExplanationImage] = useState<File | null>(null);
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [difficulty, setDifficulty] = useState('');

  const questionImageRef = useRef<HTMLInputElement>(null);
  const explanationImageRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleImageUpload = (
    type: 'question' | 'explanation', 
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type and size
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (!allowedTypes.includes(file.type)) {
        toast({
          title: 'Invalid File Type',
          description: 'Please upload a JPG, PNG, or GIF image.',
          variant: 'error'
        });
        return;
      }

      if (file.size > maxSize) {
        toast({
          title: 'File Too Large',
          description: 'Image must be less than 5MB.',
          variant: 'error'
        });
        return;
      }

      if (type === 'question') {
        setQuestionImage(file);
      } else {
        setExplanationImage(file);
      }
    }
  };

  const removeImage = (type: 'question' | 'explanation') => {
    if (type === 'question') {
      setQuestionImage(null);
      if (questionImageRef.current) questionImageRef.current.value = '';
    } else {
      setExplanationImage(null);
      if (explanationImageRef.current) explanationImageRef.current.value = '';
    }
  };

  const renderImageUploader = (
    type: 'question' | 'explanation', 
    image: File | null, 
    imageRef: React.RefObject<HTMLInputElement>
  ) => {
    return (
      <div className="space-y-2">
        <Label>{type === 'question' ? 'Question' : 'Explanation'} Image (Optional)</Label>
        <div className="flex items-center space-x-2">
          <Input
            ref={imageRef}
            type="file"
            accept="image/jpeg,image/png,image/gif"
            onChange={(e) => handleImageUpload(type, e)}
            className="hidden"
            id={`${type}-image-upload`}
          />
          <Button 
            type="button" 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={() => imageRef.current?.click()}
          >
            <ImagePlus className="h-4 w-4" />
            Upload Image
          </Button>
          {image && (
            <div className="flex items-center space-x-2">
              <FileImage className="h-5 w-5 text-blue-500" />
              <span className="text-sm">{image.name}</span>
              <Button 
                type="button" 
                variant="ghost" 
                size="sm" 
                onClick={() => removeImage(type)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validation logic
    const errors = [];

    if (!questionText.trim()) errors.push('Question text is required');
    if (options.some(opt => !opt.trim())) errors.push('All options must be filled');
    if (!correctAnswer) errors.push('Please select a correct answer');
    if (!category) errors.push('Please select a category');
    if (!difficulty) errors.push('Please select difficulty level');

    if (errors.length > 0) {
      toast({
        title: 'Validation Error',
        description: errors.join(', '),
        variant: 'error'
      });
      return;
    }

    // Prepare form data
    const formData = new FormData();
    formData.append('questionText', questionText);
    formData.append('options', JSON.stringify(options));
    formData.append('correctAnswer', correctAnswer);
    formData.append('explanation', explanation);
    formData.append('category', category);
    formData.append('subCategory', subCategory);
    formData.append('difficulty', difficulty);

    if (questionImage) {
      formData.append('questionImage', questionImage);
    }

    if (explanationImage) {
      formData.append('explanationImage', explanationImage);
    }

    // TODO: Implement actual upload logic
    console.log('Submitting:', Object.fromEntries(formData));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label>Question Text</Label>
        <Textarea 
          placeholder="Enter question text" 
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
        />
      </div>

      {renderImageUploader('question', questionImage, questionImageRef)}

      <div className="grid grid-cols-2 gap-4">
        {['A', 'B', 'C', 'D'].map((label, index) => (
          <div key={label} className="space-y-2">
            <Label>Option {label}</Label>
            <Input 
              placeholder={`Option ${label}`} 
              value={options[index]}
              onChange={(e) => handleOptionChange(index, e.target.value)}
            />
          </div>
        ))}
      </div>

      <div className="space-y-2">
        <Label>Correct Answer</Label>
        <Select 
          value={correctAnswer}
          onValueChange={setCorrectAnswer}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select correct answer" />
          </SelectTrigger>
          <SelectContent>
            {['A', 'B', 'C', 'D'].map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Explanation (Optional)</Label>
        <Textarea 
          placeholder="Explanation (optional)" 
          value={explanation}
          onChange={(e) => setExplanation(e.target.value)}
        />
      </div>

      {renderImageUploader('explanation', explanationImage, explanationImageRef)}

      <div className="space-y-2">
        <Label>Category</Label>
        <Select 
          value={category}
          onValueChange={setCategory}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="NEET">NEET</SelectItem>
            <SelectItem value="JEE">JEE</SelectItem>
            <SelectItem value="GATE">GATE</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Sub-category</Label>
        <Input 
          placeholder="Sub-category (e.g., year, shift)" 
          value={subCategory}
          onChange={(e) => setSubCategory(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label>Difficulty Level</Label>
        <Select 
          value={difficulty}
          onValueChange={setDifficulty}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select difficulty level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="easy">Easy</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="hard">Hard</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button type="submit" className="w-full">Upload Question</Button>
    </form>
  );
}